import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { AddTime } from './AddTime'
import moment from 'moment'
import 'moment/locale/es-us'
const { DataTable, $, location } = window

moment.locale("es")
export const EmployeeTable = () => {

    const useLocationHook = useLocation()
    const { employeeKey } = useLocationHook.state

    const [showModal, setShowModal] = useState(false)

    const data = JSON.parse(localStorage.getItem(employeeKey))

    useEffect(() => {
        $("#notUsed").DataTable();
        $("#used").DataTable();
    }, [])

    /*  useEffect(() => {
         data.current = JSON.parse(localStorage.getItem(employeeKey))
     }, [showModal]) */

    const handleUseHours = (e) => {
        data.time[e.target.id].used = true
        localStorage.setItem(employeeKey, JSON.stringify(data))
        location.reload()
    }

    const populateTable = (state) => {
        let rows = [];

        for (let i = 0; i < data.time.length; i++) {

            if (state === data.time[i].used) {
                rows.push(
                    <tr key={i}>
                        <td>{moment(data.time[i].day).format("dddd LL")}</td>
                        <td>{moment(data.time[i].start, "hh:mm").format("LT")}</td>
                        <td>{moment(data.time[i].end, "hh:mm").format("LT")}</td>
                        <td>{data.time[i].hourTotal}</td>
                        {
                            data.time[i].used ?
                                null
                                :
                                <td>
                                    <div className="d-flex">
                                        <div className="input-group-sm d-flex">
                                            <input type="number"
                                                className="form-control form-control-sm"
                                                min="0"
                                            />
                                            <div class="input-group-text">Hora/s</div>

                                        </div>
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={handleUseHours}
                                            id={i}
                                        >
                                            usar
                                        </button>
                                    </div>
                                </td>
                        }
                    </tr>
                )
            }
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

                <Link to="/" className="btn btn-primary mx-3">Atras</Link>

                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addEmployTime" onClick={() => setShowModal(true)}>Agregar hora</button>


                <h1>Funcionario: {data.name}</h1>

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#NotUsedPane" type="button" role="tab" aria-controls="home" aria-selected="true">Horas disponibles</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#usedPane" type="button" role="tab" aria-controls="profile" aria-selected="false">Horas usadas</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="NotUsedPane" role="tabpanel" aria-labelledby="home-tab">
                        <table id="notUsed" className="table table-striped" style={{ width: "100%" }} aria-describedby="example_info">
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Desde</th>
                                    <th>Hasta</th>
                                    <th>Horas totales</th>
                                    <th>Horas usadas</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    populateTable(false)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="usedPane" role="tabpanel" aria-labelledby="profile-tab">
                        <table id="used" className="table table-striped" style={{ width: "100%" }} aria-describedby="example_info">
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
                                    populateTable(true)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>

                </div>
            </>
        </div>
    )
}
