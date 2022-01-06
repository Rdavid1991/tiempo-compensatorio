import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../helper/db';

const { ipcRenderer } = window.require('electron');

export const EditTime = () => {

    const initialState = {
        day  : "",
        start: "",
        end  : ""
    };
    const [editEmployTime, setEditEmployTime] = useState(initialState);
    const { employeeKey, id } = useParams();

    useEffect(() => {
        const employ = db().getOneEmploy(employeeKey);
        setEditEmployTime({
            day  : employ.time[id].day,
            start: employ.time[id].start,
            end  : employ.time[id].end
        });

    }, [id]);

    const handleInputChange = (e) => {
        setEditEmployTime({
            ...editEmployTime,
            [e.target.name]: e.target.value
        });
    };

    const handleInfoSave = async (e) => {
        e.preventDefault();
        const response = await db().update(id, employeeKey, editEmployTime);
        if (response) {
            ipcRenderer.send("edit-time", {
                command: "refresh-table"
            });
            setEditEmployTime(initialState);
        }
    };

    return (

        <div className="card overflow-hidden vh-100">
            <div className="card-header row">
                <div className="col-11 drag-header">
                    <h5>Editar tiempo de - {moment(editEmployTime.day).format("ddd LL")}</h5>
                </div>
                <div className="col-1">
                    <button type="button" onClick={close} className="float-end btn btn-close"></button>
                </div>
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
                        onClick={close}
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
    );
};
