import moment from "moment";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import db from "../../helper/db";
import { useForm } from "src/hooks/useForm";
import { hideModal } from "src/helper";

const TimeEditTime = props => {

    const { employeeKey, id } = props;

    const initialState = {
        day  : "",
        start: "",
        end  : ""
    };

    const [editEmployTime, setEditEmployTime, handleInputChange, reset] = useForm(initialState);

    useEffect(() => {
        const employ = db().getOneEmploy(employeeKey);
        if (employ.time.length > 0) {
            setEditEmployTime({
                day  : employ.time[id].day,
                start: employ.time[id].start,
                end  : employ.time[id].end
            });
        }
    }, [id]);

    const handleInfoSave = async (e) => {
        e.preventDefault();
        const response = await db().update(id, employeeKey, editEmployTime);
        if (response) {
            reset();
            hideModal("#timeEditModal");
        }
    };

    return (
        <div className="modal fade" id="timeEditModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar tiempo de - {moment(editEmployTime.day).format("ddd LL")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form
                        id="editEmployTimeForm"
                        onSubmit={handleInfoSave}
                    >
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="day" className="form-label">Día</label>
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    id="day"
                                    onChange={handleInputChange}
                                    name="day"
                                    value={editEmployTime.day}
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
                                    value={editEmployTime.start}
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
                                    value={editEmployTime.end}
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
                                className="btn btn-sm btn-primary"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

TimeEditTime.propTypes = {
    employeeKey: PropTypes.string.isRequired,
    id         : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])
};

export default TimeEditTime;