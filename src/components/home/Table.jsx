
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AddEmployer } from './AddEmployer';
const { DataTable } = window

export const Table = () => {

    useEffect(() => {
        new DataTable("#example");
    }, [])

    const populateTable = () => {
        const rows = []
        let items = ""
        for (const key in localStorage) {

            if (localStorage.hasOwnProperty(key)) {
                items = JSON.parse(localStorage.getItem(key))

                let sum = 0
                items.time.map((item) => {
                    sum += item.hourTotal
                    return true
                })

                rows.push(
                    <tr>
                        <td>
                            <Link to="/employed" state={{employeeKey : key}} >{items.name}</Link>
                        </td>
                        <td data-storageKey={key}>{sum} </td>
                    </tr>
                )
            }
        }

        return rows;
    }

    return (
        <>
            <AddEmployer />

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmploy">Nuevo funcionario</button>

            <div>
                <table id="example" className="display dataTable" style={{ width: "100%" }} aria-describedby="example_info">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Total Horas</th>
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
