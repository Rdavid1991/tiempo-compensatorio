
import React, { useState } from 'react';
import db from '../../helper/db';
import { ajax } from './helper/ajax';

export const AddEmployer = ({ table }) => {

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

        await db().insert(addEmploy);
        table.current.clear().rows.add(ajax().data).draw();
        table.current.columns.adjust().draw();
        window.bootstrap.Modal.getInstance(document.querySelector('#addEmploy'), {}).hide();
        setAddEmploy(initialState);
    };

    return (
        <div className="modal fade" data-bs-backdrop="static" id="addEmploy"  >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar funcionario</h5>
                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <form
                        id="addEmployForm"
                        onSubmit={handleSaveInfo}
                    >
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Funcionario</label>
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
                                    <option value={undefined}>Selecciona un departamento</option>
                                    <option value="Administración">Administración</option>
                                    <option value="Desarrollo">Desarrollo</option>
                                    <option value="Infraestructura">Infraestructura</option>
                                    <option value="Soporte">Soporte</option>
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
                                data-bs-dismiss="modal">
                                Close
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
            </div>
        </div>
    );
};
