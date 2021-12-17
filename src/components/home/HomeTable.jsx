import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { dataTableSpanish } from '../../helper';
import { AddEmployer } from './AddEmployer';
const { DataTable } = window

export const HomeTable = () => {

    const table = useRef()

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        table.current = new DataTable("#example", {
            language: { ...dataTableSpanish }
        })
    }, [])

    useEffect(() => {

    }, [])

    const populateTable = () => {
        const rows = []
        let items = ""
        for (const key in localStorage) {

            if (localStorage.hasOwnProperty(key)) {
                items = JSON.parse(localStorage.getItem(key))

                let sum = 0, used = 0
                items.time.map((item) => {
                    if (item.used) {
                        used += item.hourTotal
                    } else {
                        sum += item.hourTotal
                        return true
                    }
                })

                rows.push(
                    <tr key={key}>
                        <td>
                            <Link to="/employed" state={{ employeeKey: key }} >{items.name}</Link>
                        </td>
                        <td>{items.department}</td>
                        <td >{used + sum}</td>
                        <td>{used}</td>
                        <td>{sum}</td>
                    </tr>
                )
            }
        }

        return rows;
    }

    return (
        <>
            <AddEmployer
                showModal={showModal}
                setShowModal={setShowModal}
            />

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmploy" onClick={() => setShowModal(true)}>Nuevo funcionario</button>

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
                            populateTable()
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
