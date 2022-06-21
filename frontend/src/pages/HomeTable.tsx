import React, { MouseEvent, useEffect, useState } from "react";
import { modalShow } from "src/utils/functions/actionModal";

import { AddFunctionary } from "../components/modals/AddFunctionary";
import EditFunctionary from "../components/modals/EditFunctionary";

import { RenderFunctionaryTable } from "../components/fragments/TableFunctionary";
import db from "src/helper/db";
import { confirmAlert, errorAlert, successAlert } from "src/utils/functions/Alerts";

interface HTMLDataTableRowElement extends HTMLTableRowElement {
    _DT_RowIndex: number
}

export const HomeTable = () => {

    const [functionaryTable, setFunctionaryTable] = useState<DataTables.DataTables>($().DataTable());
    const [action, setAction] = useState<HTMLButtonElement>();

    useEffect(() => {
        setFunctionaryTable(RenderFunctionaryTable());
        $(".pagination").addClass("pagination-sm");

        const modal = document.querySelector("#functionaryEdit");
        if (modal) modal.addEventListener("hidden.bs.modal", function () {
            setAction(undefined);
        });
    }, []);

    useEffect(() => {
        switch (action?.dataset.click) {
            case "delete":
                handleDelete();
                functionaryTable.ajax.reload();
                break;
            case "edit":
                modalShow("#functionaryEdit");
                break;
            default:
                break;
        }
    }, [action]);

    const handleDelete = async () => {
        
        const { isConfirmed } = await confirmAlert("¿Desea borrar el registro?");
        
        if (isConfirmed) {
            const isDeleted = await db().dropEmploy(action?.dataset.index as string);
            if (isDeleted) {
                
                console.log("test");
                const rowIndex = (action?.closest("tr") as HTMLDataTableRowElement | null)?._DT_RowIndex as number;

                const tr = document.querySelector(`#functionaries > tbody > :nth-child(${rowIndex + 1}) `);
                if (tr) tr.classList.add("animate__animated", "animate__backOutLeft");
                onanimationend = async (e) => {
                    if (e.animationName === "backOutLeft" && Boolean((e.target as HTMLDataTableRowElement).closest("#functionaries"))) {
                        await successAlert("El registro a sido borrado");
                        functionaryTable.ajax.reload();
                    }
                };
            } else {
                errorAlert("No se pudo borrar el registro");
            }
        }
    };

    const handlerActions = async (e: MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLButtonElement;
        setAction(target);
    };

    return (
        <>
            <div
                className="animate__animated animate__bounce animate__fadeIn"
                style={{ animationFillMode: "backwards" }}
            >
                <h1>Registro de tiempo compensatorio</h1>
                <h2>Lista de funcionarios</h2>

                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => modalShow("#addFunctionary")}
                >
                    <i className="fas fa-plus"></i>
                    Nuevo funcionario
                </button>

                <div className="mt-5">
                    <table
                        id="functionaries"
                        className="table table-sm table-striped"
                        style={{ width: "100%" }} onClick={handlerActions}
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
            <AddFunctionary {...{ functionaryTable }} />
            <EditFunctionary  {...{ functionaryTable, id: action?.dataset.index as string }} />
        </>
    );
};
