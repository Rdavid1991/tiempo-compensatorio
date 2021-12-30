import React, { useEffect, useState } from 'react';
import db from '../../helper/db';
import { ajax } from './helper/ajax';


const initialState = {
    name      : "",
    department: ""
};

export const EditEmploy = ({ indexId, table }) => {

    const [editEmploy, setEditEmploy] = useState(initialState);

    useEffect(() => {
        const response = db().getOneEmploy(indexId);
        if (response) {
            setEditEmploy({
                name      : response.name,
                department: response.department
            });
        }

    }, [indexId]);

    const handlerInputChange = ({ target }) => {
        setEditEmploy({
            ...editEmploy,
            [target.name]: target.value
        });
    };

    const handlerInfoSave = async (e) => {
        e.preventDefault();
        await db().updateEmploy(indexId, editEmploy);
        table.current.clear().rows.add(ajax().data).draw();
        table.current.columns.adjust().draw();
        window.bootstrap.Modal.getInstance(document.querySelector('#editEmploy'), {}).hide();
        setEditEmploy(initialState);
    };

    return (
        <div className="modal fade" data-bs-backdrop="static" id="editEmploy"  >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar a {editEmploy.name} </h5>
                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <form
                        id="editEmployTimeForm"
                        onSubmit={handlerInfoSave}
                    >
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="name"
                                    onChange={handlerInputChange}
                                    name="name"
                                    value={editEmploy.name}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="department" className="form-label">Departamento</label>
                                <select
                                    className="form-select form-select-sm"
                                    id="department"
                                    onChange={handlerInputChange}
                                    value={editEmploy.department}
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
