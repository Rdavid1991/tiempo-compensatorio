import React, { useEffect, useState } from 'react';
import db from '../../helper/db';


export const EditTime = ({ indexData, employeeKey, editState = {} }) => {

    const initialState = {
        day  : "",
        start: "",
        end  : ""
    };

    const [editEmployTime, setEditEmployTime] = useState(initialState);

    const handleInputChange = (e) => {
        setEditEmployTime({
            ...editEmployTime,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        setEditEmployTime(editState);
    }, [editState]);

    const handleInfoSave = (e) => {
        e.preventDefault();

        db().update(indexData, employeeKey, editEmployTime);
    };

    return (
        <div className="modal fade" data-bs-backdrop="static" id="editEmployTime"  >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar tiempo</h5>
                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <form
                        id="editEmployTimeForm"
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
