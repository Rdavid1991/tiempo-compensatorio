import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom'

export const EmployeeTable = (key) => {

    const location = useLocation()
    const { employeeKey } = location.state

    const [state, setstate] = useState(JSON.parse(localStorage.getItem(employeeKey)))

    const populateTable = () => {
        let rows = [];



        for (const key of state.time) {

            rows.push(
                <tr>
                    <td>{key.day}</td>
                    <td>{key.start}</td>
                    <td>{key.end}</td>
                    <td>{key.hourTotal}</td>
                </tr>
            )
        }
        return rows;
    }

    return (
        <div>
            <>
                <Link to="/">Atras</Link>

                <h1>Funcionario: { state.name }</h1>

                <div>
                    <table id="example" className="display dataTable" style={{ width: "100%" }} aria-describedby="example_info">
                        <thead>
                            <tr>
                                <th>Dia</th>
                                <th>Desde</th>
                                <th>Hasta</th>
                                <th>Horas</th>
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
        </div>
    )
}
