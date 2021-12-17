import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { AddTime } from './AddTime'
const { DataTable } = window

export const EmployeeTable = () => {

    const location = useLocation()
    const { employeeKey } = location.state

    const [showModal, setShowModal] = useState(false)

    const data = JSON.parse(localStorage.getItem(employeeKey))

    useEffect(() => {
        new DataTable("#employeeTable");
    }, [])

    /*  useEffect(() => {
         data.current = JSON.parse(localStorage.getItem(employeeKey))
     }, [showModal]) */

    const handleUseHours = (e) => {
        data.time[e.target.id].used = true
        localStorage.setItem(employeeKey, JSON.stringify(data))
    }

    const populateTable = () => {
        let rows = [];

        for (let i = 0; i < data.time.length; i++) {

            rows.push(
                <tr key={i}>
                    <td>{data.time[i].day}</td>
                    <td>{data.time[i].start}</td>
                    <td>{data.time[i].end}</td>
                    <td>{data.time[i].hourTotal}</td>
                    <td>
                        <button
                            className="btn btn-secondary"
                            onClick={handleUseHours}
                            id={i}
                        >
                            usar
                        </button>
                    </td>
                </tr>
            )
        }
        return rows;
    }

    return (
        <div>
            <>

                <AddTime
                    employeeKey={employeeKey}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />

                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addEmployTime" onClick={() => setShowModal(true)}>Agregar hora</button>

                <Link to="/" className="btn btn-primary">Atras</Link>

                <h1>Funcionario: {data.name}</h1>

                <div>
                    <table id="employeeTable" className="table table-striped" style={{ width: "100%" }} aria-describedby="example_info">
                        <thead>
                            <tr>
                                <th>Dia</th>
                                <th>Desde</th>
                                <th>Hasta</th>
                                <th>Horas</th>
                                <th>Acción</th>
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
