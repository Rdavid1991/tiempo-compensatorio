import React, { MouseEvent, useEffect, useState } from "react";
import { modalShow } from "src/utils/Modal";

// import db from "src/helper/db";
// import { confirmAlert, errorAlert, successAlert } from "src/utils/Alerts";
// import { showModal } from "../../helper";
import { AddFunctionary } from "./AddFunctionary";
import EditFunctionary from "./EditFunctionary"; 

import { RenderFunctionaryTable } from "./functions/ActionFunctionaryTable";
// import db from "../../helper/db";
// import { ajax } from "./helper/ajax";
// import { employTable } from "./helper/employTable";
// import { ipcRendererEvent } from "./helper/ipcRendererEvent";
// const { $, require } = window;

//const { ipcRenderer } = require("electron");

export const HomeTable = () => {

    const [functionaryTable, setFunctionaryTable] = useState<DataTables.DataTables>($().DataTable());
    const [indexId, setIndexId] = useState("");

    useEffect(() => {
        setFunctionaryTable(RenderFunctionaryTable());
        $(".pagination").addClass("pagination-sm");
    }, []);

    /*  const handleDelete = async (target) => {

        const { isConfirmed } = await confirmAlert("¿Desea borrar el registro?");

        if (isConfirmed) {
            const isDeleted = await db().dropEmploy(target.dataset.index);
            if (isDeleted) {
                const tr = target.closest("tr");
                tr.classList.add("animate__animated", "animate__backOutLeft");
                onanimationend = async (e) => {
                    if (e.animationName === "backOutLeft" && Boolean(target.closest("#functionaries"))) {
                        await successAlert("El registro a sido borrado");
                        table.ajax.reload();
                    }
                };
            } else {
                errorAlert("No se pudo borrar el registro");
            }
        }

    }; */

    const handlerActions = async ({ currentTarget }: MouseEvent<HTMLElement>) => {
        switch (currentTarget.dataset.click) {
        case "delete":
            //handleDelete(target);
            break;
        case "edit":
            console.log("llega");
            
            setIndexId(currentTarget.dataset.index as string);
            modalShow("#functionaryEdit");
            break;
        default:
            break;
        }
    };

    return (
        <>
            <div 
                className="animate__animated animate__bounce animate__fadeIn" 
                style={{ animationFillMode: "backwards" }} 
            >

                <h1>Registro de tiempo compensatorio, Funciona</h1>
                <h2>Lista de funcionarios</h2>

                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={()=> modalShow("#addFunctionary")}
                >
                    <i className="fas fa-plus"></i>
                    Nuevo funcionario
                </button>

                <div className="mt-5">
                    <table 
                        id="functionaries" 
                        className="table table-sm table-striped" 
                        style={{ width: "100%" }}  onClick={handlerActions}
                    >
                        <thead >
                            <tr>
                                <th>Nombre</th>
                                <th>Departamento</th>
                                <th>Tiempo total</th>
                                <th>Tiempo usadas</th>
                                <th>Tiempo restante</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <AddFunctionary {...{functionaryTable}} />
            <EditFunctionary  {...{functionaryTable, indexId}}/> 
        </>
    );
};
