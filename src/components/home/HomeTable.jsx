/* globals $*/
import React, { useEffect, useState } from "react";
import { showModal } from "src/helper";
import db from "src/helper/db";
import { confirmAlert, errorAlert, successAlert } from "src/utils/Alerts";
import { AddFunctionary } from "./AddFunctionary";
import EditFunctionary from "./EditFunctionary";
import FunctionaryHeader from "./fragments/FunctionaryHeader";
import { RenderFunctionaryTable, RefreshFunctionaryTable } from "./functions/ActionFunctionaryTable";
// import db from "../../helper/db";
// import { ajax } from "./helper/ajax";
// import { employTable } from "./helper/employTable";
// import { ipcRendererEvent } from "./helper/ipcRendererEvent";
// const { $, require } = window;

//const { ipcRenderer } = require("electron");

export const HomeTable = () => {

    const [table, setTable] = useState({});
    const [indexId, setIndexId] = useState("");

    useEffect(() => {
        setTable(RenderFunctionaryTable());
        $(".pagination").addClass("pagination-sm");
    }, []);

    const handleDelete = async (target) => {

        const { isConfirmed } = await confirmAlert("¿Desea borrar el registro?");

        if (isConfirmed) {
            const isDeleted = await db().dropEmploy(target.dataset.index);
            if (isDeleted) {
                var tr = target.closest("tr");
                tr.classList.add("animate__animated", "animate__backOutLeft");
                onanimationend = async (e) => {
                    if (e.animationName === "backOutLeft" && Boolean(target.closest("#functionaries"))) {
                        await successAlert("El registro a sido borrado");
                        RefreshFunctionaryTable(table);
                    }
                };
            } else {
                errorAlert("No se pudo borrar el registro");
            }
        }

    };

    const handlerActions = async ({ target }) => {
        switch (target.dataset.click) {
            case "delete":
                handleDelete(target);
                break;
            case "edit":
                setIndexId(target.dataset.index);
                showModal("#functionaryEdit");
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }} >

                <FunctionaryHeader/>

                <div className="mt-5">
                    <table id="functionaries" className="table table-sm table-striped" style={{ width: "100%" }} onClick={handlerActions}>
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
            <AddFunctionary
                functionaryTable={table}
            />
            <EditFunctionary
                indexId={indexId}
            />
        </>
    );
};
