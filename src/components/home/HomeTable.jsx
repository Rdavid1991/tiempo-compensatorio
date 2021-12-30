import React, { useEffect, useRef, useState } from 'react';
import { dataTableSpanish } from '../../helper';
import db from '../../helper/db';
import { AddEmployer } from './AddEmployer';
import { EditEmploy } from './EditEmploy';
import { ajax } from './helper/ajax';
const { $ } = window;

export const HomeTable = () => {

    const table = useRef();

    useEffect(() => {
        table.current = $("#example").DataTable({
            language    : { ...dataTableSpanish },
            "aaData"    : ajax().data,
            "retrieve"  : true,
            "columnDefs": [
                {
                    targets: [0],
                    render : function (data) {
                        const index = data.split("|");
                        return `<a href="#/employed/${index[0]}" class="text-truncate">${index[1]}</a>`;
                    }
                },
                {
                    targets: [5],
                    render : (key) => {
                        const html = `<button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#editEmploy" data-click="edit" data-index="${key}"><i class="far fa-edit"></i></button>
                                        <button class="btn btn-sm btn-secondary" data-click="delete" data-index="${key}"><i class="far fa-trash-alt"></i></button>`;
                        return html;
                    }
                }
            ]
        });
        $(".pagination").addClass("pagination-sm");
    }, []);

    const [indexId, setIndexId] = useState("");

    const handlerActions = async ({ target }) => {

        switch (target.dataset.click) {
            case "delete":
                await db().dropEmploy(target.dataset.index);
                table.current.clear().rows.add(ajax().data).draw();
                table.current.columns.adjust().draw();
                break;
            case "edit":
                setIndexId(target.dataset.index);
                break;

            default:
                break;
        }
    };

    return (
        <div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }} >
            <AddEmployer
                table={table}
            />

            <EditEmploy
                indexId={indexId}
                table={table}
            />

            <h1>Registro de tiempo compensatorio</h1>
            <h2>Lista de funcionarios</h2>

            <button
                type="button"
                className="btn btn-sm  btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addEmploy"
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
    );
};
