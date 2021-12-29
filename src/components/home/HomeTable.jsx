import React, { useEffect, useRef } from 'react';
//import { render } from 'react-dom';
//import { Link } from 'react-router-dom';
import { dataTableSpanish } from '../../helper';
import { AddEmployer } from './AddEmployer';
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
                        return  `<a href="#/employed/${index[0]}">${index[1]}</a>`;  
                    }
                }
            ]
        });
        $(".pagination").addClass("pagination-sm");
    }, []);

    return (
        <div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }} >
            <AddEmployer
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
                Nuevo funcionario
            </button>

            <div className="mt-5">
                <table id="example" className="table table-sm table-striped" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Departamento</th>
                            <th>Tiempo total</th>
                            <th>Tiempo usadas</th>
                            <th>Tiempo restante</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};
