import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { dataTableSpanish } from '../../helper';
import { AddEmployer } from './AddEmployer';
import { PopulateTable } from './PopulateTable';
const { DataTable, $ } = window

export const HomeTable = () => {

    const table = useRef()

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        table.current = $("#example").DataTable({
            language: { ...dataTableSpanish }
        })
    }, [])

    return (
        <>
            <AddEmployer
                showModal={showModal}
                setShowModal={setShowModal}
            />

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmploy" onClick={() => setShowModal(true)}>Nuevo funcionario</button>

            <div className="mt-5">
                <table id="example" className="table table-striped" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Departamento</th>
                            <th>Total horas</th>
                            <th>Horas usadas</th>
                            <th>Horas restantes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <PopulateTable />
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
