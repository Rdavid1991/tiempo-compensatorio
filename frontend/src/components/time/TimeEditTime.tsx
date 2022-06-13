import moment from "moment";
import React, { FormEvent, useEffect } from "react";
import PropTypes from "prop-types";
import db from "../../helper/db";
import { useForm } from "src/hooks/useForm";
import { TimeEditSchema } from "src/interfaces";
import { modalHide } from "src/utils/Modal";

interface PropsTimeEditTime {
    employeeKey : string;
    id : number;
}

const initialState : TimeEditSchema = {
    day   : "",
    end   : "",
    start : "",
};

const TimeEditTime = ({employeeKey, id}: PropsTimeEditTime) => {

    const { values, setValues, handleInputChange, reset} = useForm<TimeEditSchema>(initialState);

    useEffect(() => {
        const employ = db().getOneEmploy(employeeKey);
        if (employ.time.length > 0) {
            setValues({
                day   : employ.time[id].day,
                end   : employ.time[id].end,
                start : employ.time[id].start, 
            });
        }
    }, [id]);

    const handleInfoSave = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await db().update(id, employeeKey, values);
        if (response) {
            reset();
            modalHide("#timeEditModal");
        }
    };

    return (
        <div className="modal fade" id="timeEditModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar tiempo de - {moment(values.day).format("ddd LL")}</h5>
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
                                    value={values.day}
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
                                    value={values.start}
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
                                    value={values.end}
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
    employeeKey : PropTypes.string.isRequired,
    id          : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])
};

export default TimeEditTime;