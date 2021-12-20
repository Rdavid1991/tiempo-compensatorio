import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { AddTime } from './AddTime'
import moment from 'moment'
import 'moment/locale/es-us'
import { PopulateTable } from './helper/PopulateTable'
const { DataTable, $, location } = window

moment.locale("es")
export const EmployeeTable = () => {

    const useLocationHook = useLocation()
    const { employeeKey } = useLocationHook.state
    const data = JSON.parse(localStorage.getItem(employeeKey))

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {

        $("#notUsed").DataTable();
        //$("#used").DataTable();
    }, [])

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
                                    <th>Horas restantes</th>
                                    <th>Horas usadas</th>
                                    <th>Horas totales</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <PopulateTable
                                    data={data}
                                    employeeKey={employeeKey}
                                    state={false} />
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
                                    //PopulateTable(data, employeeKey, true)
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
