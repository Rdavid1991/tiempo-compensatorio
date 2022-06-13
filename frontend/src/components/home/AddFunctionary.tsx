import moment from "moment";
import React, { FormEvent } from "react";
import { modalHide } from "src/utils/Modal";


import Swal from "sweetalert2";
import { compareDiffTime } from "../../helper";
import db from "../../helper/db";
import { useForm } from "../../hooks/useForm";
import { FunctionaryAddFormSchema } from "../../interfaces";

interface Props {
    functionaryTable : DataTables.DataTables
}

export const AddFunctionary = ({ functionaryTable } : Props) => {

    const initialState : FunctionaryAddFormSchema = {
        day        : "",
        department : "",
        end        : "18:00",
        hourLeft   : 0,
        hourTotal  : 0,
        hourUsed   : 0,
        name       : "",
        start      : "16:00",
        used       : false
    };

    const {values, handleInputChange, reset} = useForm<FunctionaryAddFormSchema>(initialState);

    const handleSaveInfo = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (compareDiffTime(values.start, values.end)) {
            await db().insert(values);
            functionaryTable.ajax.reload();

            modalHide("#addFunctionary");
            reset();
        } else {
            Swal.fire(
                "Lo siento",
                `No puede ingresar las horas en ese orden. <br>
                    Desde ${moment(values.start, "hh:mm").format("LT")} es menor que, Hasta ${moment(values.end, "hh:mm").format("LT")}`,
                "error"
            );
        }
    };

    return (
        <div className="modal fade" id="addFunctionary">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    value={values.name}
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
                                    value={values.department}
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
                                    name="start"
                                    value={values.start}
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
                                    value={values.end}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="reset"
                                className="btn btn-sm btn-secondary"
                            >
                                Limpiar campos
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                data-bs-dismiss="modal"
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
            </div>
        </div>

    );
};
