import React, { useEffect, useRef, useState } from 'react';
import { dataTableSpanish } from '../../helper';
import { AddEmployer } from './AddEmployer';
import { PopulateTable } from './PopulateTable';
const { $ } = window;

export const HomeTable = () => {

    const table = useRef();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        table.current = $("#example").DataTable({
            language: { ...dataTableSpanish }
        });
        $(".pagination").addClass("pagination-sm");
    }, []);

    return (
        <div className="animate__animated animate__bounce animate__fadeIn" style={{animationFillMode: "backwards"}} >
            <AddEmployer
                showModal={showModal}
                setShowModal={setShowModal}
            />

            <h1>Registro de tiempo compensatorio</h1>
            <h2>Lista de funcionarios</h2>

            <button
                type="button"
                className="btn btn-sm  btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addEmploy"
                onClick={() => setShowModal(true)}
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
                    <tbody>
                        {
                            <PopulateTable />
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
