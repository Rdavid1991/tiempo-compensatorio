
import React, { Dispatch, FormEvent, useEffect } from "react";
import { useForm } from "src/hooks/useForm";
import db from "../../helper/db";
import { FunctionaryEditFormSchema } from "src/utils/interfaces";
import { modalHide } from "../../utils/Modal";

const initialState : FunctionaryEditFormSchema = {
    department : "",
    name       : "",
};

interface Props {
    indexId: string;
    setIndexId : Dispatch<React.SetStateAction<string>> ;
    functionaryTable: DataTables.DataTables
}

const EditFunctionary = ({indexId, functionaryTable, setIndexId} : Props) => {

    const { values, setValues, handleInputChange, reset } = useForm<FunctionaryEditFormSchema>(initialState);

    useEffect(() => {
        const response = db().getOneEmploy(indexId) as FunctionaryEditFormSchema;
        if (response) {
            setValues(response);
        }
    }, [indexId]);

    const handlerInfoSave = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await db().updateEmploy(indexId, values);
        functionaryTable.ajax.reload();
        modalHide("#functionaryEdit");
        reset();
        setIndexId("");
    };

    return (

        <div className="modal fade" id="functionaryEdit" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                        <div className="modal-body">
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


export default React.memo(EditFunctionary);