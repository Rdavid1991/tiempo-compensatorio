import moment from 'moment';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { compareDiffTime } from '../../helper';
import db from '../../helper/db';

const { ipcRenderer } = window.require('electron');

export const AddEmployer = () => {

    const initialState = {
        name      : "",
        department: "",
        day       : "",
        start     : "16:00",
        end       : "",
        hourTotal : 0,
        hourLeft  : 0,
        hourUsed  : 0,
        used      : false
    };

    const [addEmploy, setAddEmploy] = useState(initialState);

    const handleInputChange = (e) => {

        setAddEmploy({
            ...addEmploy,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveInfo = async (e) => {
        e.preventDefault();
        if (compareDiffTime(addEmploy.start, addEmploy.end)) {
            await db().insert(addEmploy);
            ipcRenderer.send("add-employ", "refresh-table");
            setAddEmploy(initialState);
        } else {
            Swal.fire(
                'Lo siento',
                `No puede ingresar las horas en ese orden. <br>
                    Desde ${moment(addEmploy.start, "hh:mm").format("LT")} es menor que, Hasta ${moment(addEmploy.end, "hh:mm").format("LT")}`,
                'error'
            );
        }
    };

    const close = () => {
        setAddEmploy(initialState);
        ipcRenderer.send("add-employ", "close");
    };

    return (
        <div className="card overflow-hidden" style={{ "width": "100%", "height": "100vh" }} >
            <div className="card-header">
                <div className="row">
                    <div className="col-11 drag-header">
                        <h5>Agregar funcionario</h5>
                    </div>
                    <div className="col-1">
                        <button type="button" onClick={close} className="float-end btn btn-close"></button>
                    </div>
                </div>
            </div>
            <form
                id="addEmployForm"
                onSubmit={handleSaveInfo}
            >
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="name"
                            onChange={handleInputChange}
                            value={addEmploy.name}
                            name="name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">Departamento</label>
                        <select
                            className="form-select form-select-sm"
                            id="department"
                            onChange={handleInputChange}
                            value={addEmploy.department}
                            name="department"
                            required
                        >
                            <option value="DISPROS">DISPROS</option>
                            {/* <option value="Administración">Administración</option>
                            <option value="Desarrollo">Desarrollo</option>
                            <option value="Infraestructura">Infraestructura</option>
                            <option value="Soporte">Soporte</option> */}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="day" className="form-label">Día</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            id="day"
                            onChange={handleInputChange}
                            name="day"
                            value={addEmploy.day}
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
                            name="start"
                            value={addEmploy.start}
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
                            name="end"
                            value={addEmploy.end}
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
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-sm  btn-primary"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>

    );
};
