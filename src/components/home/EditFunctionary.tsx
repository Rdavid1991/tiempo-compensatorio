
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "src/hooks/useForm";
import db from "../../helper/db";
import { Modal } from "src/utils/Modal";

const initialState = {
    name      : "",
    department: ""
};

const EditFunctionary = ({indexId, functionaryTable}) => {

    const { values, setValues, handleInputChange, reset } = useForm(initialState);

    useEffect(() => {
        const response = db().getOneEmploy(indexId);
        if (response) {
            setValues({
                name      : response.name,
                department: response.department
            });
        }
    }, [indexId]);

    const handlerInfoSave = async (e) => {
        e.preventDefault();
        await db().updateEmploy(indexId, values);
        functionaryTable.ajax.reload();
        Modal.hide("#functionaryEdit");
        reset();
    };

    return (

        <div className="modal fade" id="functionaryEdit" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Editar funcionario</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    onChange={handleInputChange}
                                    name="name"
                                    value={values.name}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="department" className="form-label">Departamento</label>
                                <select
                                    className="form-select form-select-sm"
                                    id="department"
                                    onChange={handleInputChange}
                                    value={values.department}
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


EditFunctionary.propTypes = {
    indexId: PropTypes.string.isRequired
};

export default React.memo(EditFunctionary);