
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../helper/db";

const { ipcRenderer } = window.require("electron");

const initialState = {
    name      : "",
    department: ""
};

export const EditEmploy = () => {

    const { id } = useParams();

    const [editEmploy, setEditEmploy] = useState(initialState);

    useEffect(() => {
        const response = db().getOneEmploy(id);
        if (response) {
            setEditEmploy({
                name      : response.name,
                department: response.department
            });
        }
    }, [id]);

    const handlerInputChange = ({ target }) => {
        setEditEmploy({
            ...editEmploy,
            [target.name]: target.value
        });
    };

    const handlerInfoSave = async (e) => {
        e.preventDefault();
        await db().updateEmploy(id, editEmploy);
        ipcRenderer.send("edit-employ", ["refresh-table"]);
        setEditEmploy(initialState);
    };

    const close = () => {
        ipcRenderer.send("edit-employ", ["close"]);
    };

    return (

        <div className="card" style={{ "width": "100%", "height": "100vh" }}>
            <div className="card-header">
                <div className="row">
                    <div className="col-11 drag-header">
                        <h5>Editar funcionario</h5>
                    </div>
                    <div className="col-1">
                        <button type="button" onClick={close} className="float-end btn btn-close"></button>
                    </div>
                </div>
            </div>
            <form
                id="editEmployTimeForm"
                onSubmit={handlerInfoSave}
            >
                <div className="card-body">
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
                        onClick={close}
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
    );
};
