import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Swal from "sweetalert2";
import { compareDiffTime } from "../../helper";
//import { ajaxEmploy } from './helper/ajaxEmploy';
import { useParams } from "react-router-dom";
import { RefreshNotUsedTable } from "./function/ActionTimeTable";

//const { ipcRenderer } = window.require("electron");

const TimeAddTime = props => {

    const { timeTable } = props;

    const { employeeKey } = useParams();

    const initialState = {
        day  : "",
        start: "16:00",
        end  : "",
        used : false
    };

    const [addTime, setAddTime] = useState(initialState);

    const handleInputChange = (e) => {

        setAddTime({
            ...addTime,
            [e.target.name]: e.target.value
        });
    };

    const handleInfoSave = (e) => {
        e.preventDefault();

        if (compareDiffTime(addTime.start, addTime.end)) {

            const duration = moment.duration(
                moment(addTime.end, "hh:mm").diff(
                    moment(addTime.start, "hh:mm")
                )
            );

            // eslint-disable-next-line no-prototype-builtins
            if (localStorage.hasOwnProperty(employeeKey)) {
                const info = JSON.parse(localStorage.getItem(employeeKey));

                info.time.push({
                    day            : addTime.day,
                    start          : addTime.start,
                    end            : addTime.end,
                    hourTotal      : `${duration.hours()}${duration.minutes() > 0 ? `:${duration.minutes()}` : ""}`,
                    hourLeft       : `${duration.hours()}${duration.minutes() > 0 ? `:${duration.minutes()}` : ""}`,
                    hourUsed       : 0,
                    used           : addTime.used,
                    usedHourHistory: []
                });
                localStorage.setItem(employeeKey, JSON.stringify(info));
            }
            setAddTime(initialState);
            //bootstrap.Modal.getInstance(document.querySelector('#addTime'), {}).hide();
            Swal.fire({
                position         : "top-end",
                icon             : "success",
                title            : "Horas guardadas",
                showConfirmButton: false,
                timer            : 1000
            }).then(() => {
                RefreshNotUsedTable(employeeKey, timeTable.notUsed);
            });
        } else {
            Swal.fire(
                "Lo siento",
                `No puede ingresar las horas en ese orden. <br>
                    Desde ${moment(addTime.start, "hh:mm").format("LT")} es menor que, Hasta ${moment(addTime.end, "hh:mm").format("LT")}`,
                "error"
            );
        }
    };

    return (

        <div className="modal" id="functionaryAddTime">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    value={addTime.day}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="start">Desde</label>
                                <input
                                    type="time"
                                    className="form-control form-control-sm"
                                    id="start"
                                    onChange={handleInputChange}
                                    value={addTime.start}
                                    name="start"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="end">Hasta</label>
                                <input
                                    type="time"
                                    className="form-control form-control-sm"
                                    id="end"
                                    onChange={handleInputChange}
                                    value={addTime.end}
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

TimeAddTime.propTypes = {
    timeTable: PropTypes.exact({
        used   : PropTypes.objectOf(PropTypes.any),
        notUsed: PropTypes.objectOf(PropTypes.any)
    })
};

export default React.memo(TimeAddTime);