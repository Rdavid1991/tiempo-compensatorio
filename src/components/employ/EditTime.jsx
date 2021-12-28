import React, { useEffect, useState } from 'react';
import moment from "moment";
import Swal from 'sweetalert2';
import { evalTime } from '../../helper';

const { bootstrap, location } = window;

export const EditTime = ({ indexData, employeeKey, editState = {} }) => {

    const [addEmployTime, setAddEmployTime] = useState(editState);

    const handleInputChange = (e) => {

        setAddEmployTime({
            ...addEmployTime,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        setAddEmployTime(editState);
    }, [editState]);

    const handleInfoSave = (e) => {
        e.preventDefault();

        if (evalTime(addEmployTime.start, addEmployTime.end)) {

            const duration = moment.duration(
                moment(addEmployTime.end, "hh:mm").diff(
                    moment(addEmployTime.start, "hh:mm")
                )
            );

            // eslint-disable-next-line no-prototype-builtins
            if (localStorage.hasOwnProperty(employeeKey)) {
                const info = JSON.parse(localStorage.getItem(employeeKey));

                info.time[indexData] = {
                    day            : addEmployTime.day,
                    start          : addEmployTime.start,
                    end            : addEmployTime.end,
                    hourTotal      : `${duration.hours()}${duration.minutes() > 0 ? `:${duration.minutes()}` : ""}`,
                    hourLeft       : `${duration.hours()}${duration.minutes() > 0 ? `:${duration.minutes()}` : ""}`,
                    hourUsed       : info.time[indexData].hourUsed,
                    used           : addEmployTime.used,
                    usedHourHistory: []
                };
                localStorage.setItem(employeeKey, JSON.stringify(info));
            }

            bootstrap.Modal.getInstance(document.querySelector('#editEmployTime'), {}).hide();
            Swal.fire({
                position         : 'top-end',
                icon             : 'success',
                title            : 'Horas actualizadas',
                showConfirmButton: false,
                timer            : 1000
            }).then(() => {
                location.reload();
            });
        } else {
            Swal.fire(
                'Lo siento',
                `No puede ingresar las horas en ese orden. <br>
                    Desde ${moment(addEmployTime.start, "hh:mm").format("LT")} es menor que, Hasta ${moment(addEmployTime.end, "hh:mm").format("LT")}`,
                'error'
            );
        }
    };

    return (
        <div className="modal fade" data-bs-backdrop="static" id="editEmployTime"  >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar funcionario</h5>
                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <form
                        id="addEmployTimeForm"
                        onSubmit={handleInfoSave}
                    >
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="day" className="form-label">Día</label>
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    id="day"
                                    onChange={handleInputChange}
                                    name="day"
                                    value={addEmployTime.day}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="start">Desde</label>
                                <input
                                    type="time"
                                    className="form-input"
                                    id="start"
                                    onChange={handleInputChange}
                                    value={addEmployTime.start}
                                    name="start"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="end">Hasta</label>
                                <input
                                    type="time"
                                    className="form-input"
                                    id="end"
                                    onChange={handleInputChange}
                                    value={addEmployTime.end}
                                    name="end"
                                    required
                                />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
