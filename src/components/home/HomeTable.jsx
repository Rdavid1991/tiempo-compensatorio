/* globals $*/
import React, { useEffect, useState } from "react";
import { AddFunctionary } from "./AddFunctionary";
import { RenderFunctionaryTable } from "./functions/ActionFunctionaryTable";
// import db from "../../helper/db";
// import { ajax } from "./helper/ajax";
// import { employTable } from "./helper/employTable";
// import { ipcRendererEvent } from "./helper/ipcRendererEvent";
// const { $, require } = window;

//const { ipcRenderer } = require("electron");

export const HomeTable = () => {

   const [table, setTable] = useState({});

    useEffect(() => {
        setTable(RenderFunctionaryTable());
        $(".pagination").addClass("pagination-sm");
    }, []);

    //const [indexId, setIndexId] = useState(""); * elementos para la web

    const handlerActions = async ({ target }) => {

        switch (target.dataset.click) {
            case "delete":
                /* await db().dropEmploy(target.dataset.index);
                table.current.clear().rows.add(ajax().data).draw();
                table.current.columns.adjust().draw(); */
                break;
            case "edit":
                //setIndexId(target.dataset.index); * elementos para la web
                //ipcRenderer.send("edit-employ",["open", target.dataset.index]);
                break;

            default:
                break;
        }
    };

    return (
        <>
            <div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }} >

                {
                    //elementos para la web
                    /* <EditEmploy
                        indexId={indexId}
                        table={table}
                    />*/
                }

                <h1>Registro de tiempo compensatorio</h1>
                <h2>Lista de funcionarios</h2>

                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal" 
                    data-bs-target="#addFunctionary"
                >
                    <i className="fas fa-plus"></i>
                    Nuevo funcionario
                </button>

                <div className="mt-5">
                    <table id="example" className="table table-sm table-striped" style={{ width: "100%" }} onClick={handlerActions}>
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
        </>
    );
};
