/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es-us';
import { DetailsTime } from './DetailsTime';
import { UseTime } from './UseTime';
import { EditTime } from './EditTime';
import { ajaxEmploy } from './helper/ajaxEmploy';
import db from '../../helper/db';
import { employTables } from './helper/employTables';
import { ipcRendererEvent } from './helper/ipcRendererEvent';
const { $, bootstrap, require } = window;

const { ipcRenderer } = require("electron");

const localDB = db();
moment.locale("es");
export const EmployeeTable = () => {

    const notUsedTable = useRef();
    const usedTable = useRef();

    const { employeeKey } = useParams();
    const [indexData, setIndexData] = useState(0);
    const [data, setData] = useState(JSON.parse(localStorage.getItem(employeeKey)));

    useEffect(() => {
        usedTable.current = employTables(employeeKey).used;
        notUsedTable.current = employTables(employeeKey).notUsed;
        $(".pagination").addClass("pagination-sm");
        ipcRendererEvent(employeeKey).refreshNotUseTable(notUsedTable);
        ipcRendererEvent(employeeKey).refreshUseTable(usedTable);
    }, []);

    const handleDelete = async () => {
        const isDeleted = await localDB.drop(indexData, employeeKey);
        if (isDeleted) {
            notUsedTable.current.clear().rows.add(ajaxEmploy(employeeKey).notUsed().data).draw();
            notUsedTable.current.columns.adjust().draw();
        }
    };

    const handleActionTable = (e) => {

        const { target } = e;

        switch (target.dataset.click) {
            case "details":
                setIndexData(target.dataset.index);
                var details = new bootstrap.Modal(document.querySelector('#details'), {});
                details.show();
                break;
            case "delete":
                setIndexData(target.dataset.index);
                handleDelete();
                break;
            case "useTime":
                setIndexData(target.dataset.index);
                break;
            case "editTime":
                setIndexData(target.dataset.index);
                break;
            default:
                break;
        }
    };

    const refreshHistoryUsedTime = () => {
        setData(JSON.parse(localStorage.getItem(employeeKey)));
    };

    return (

        < div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }}>

            {/* <AddTime
                employeeKey={employeeKey}
                notUsedTable={notUsedTable}
                refreshHistoryUsedTime={refreshHistoryUsedTime}
            /> */}

            {
                data.time.length > 0
                    ?
                    <>
                        <UseTime
                            dateFrom={data.time[indexData].day}
                            indexData={indexData}
                            employeeKey={employeeKey}
                            notUsedTable={notUsedTable}
                            refreshHistoryUsedTime={refreshHistoryUsedTime}
                        />
                        <EditTime
                            employeeKey={employeeKey}
                            editState={{
                                day  : data.time[indexData].day,
                                start: data.time[indexData].start,
                                end  : data.time[indexData].end,
                                used : false
                            }}
                            indexData={indexData}
                            notUsedTable={notUsedTable}
                            refreshHistoryUsedTime={refreshHistoryUsedTime}
                        />
                        <DetailsTime
                            data={data.time[indexData]}
                        />
                    </>
                    : ""

            }

            <h2>Funcionario: {data.name}</h2>
            <Link
                to="/"
                className="btn btn-sm btn-primary"
            >
                <i className="fas fa-arrow-left"></i>
                Atrás
            </Link>

            <button
                className="btn btn-sm btn-success mx-3"
                onClick={() => {
                    console.log(employeeKey);
                    ipcRenderer.send("add-time",["open",employeeKey]);
                }}
            >
                <i className="fas fa-plus"></i>
                Agregar hora
            </button>

            <div className="mt-3">

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="btn-sm nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#NotUsedPane" type="button" role="tab" aria-controls="home" aria-selected="true">Horas disponibles</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn-sm nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#usedPane" type="button" role="tab" aria-controls="profile" aria-selected="false">Horas usadas</button>
                    </li>
                </ul>
                <div className="tab-content mt-4" id="myTabContent" onClick={handleActionTable}>
                    <div className="tab-pane fade show active" id="NotUsedPane" role="tabpanel" aria-labelledby="home-tab">
                        <table id="notUsed" className="table table-sm table-striped" style={{ width: "100%" }} aria-describedby="example_info">
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Desde</th>
                                    <th>Hasta</th>
                                    <th>Tiempo total</th>
                                    <th>Tiempo usado</th>
                                    <th>Tiempo restante</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="usedPane" role="tabpanel" aria-labelledby="profile-tab">
                        <table id="used" className="table table-sm table-striped" style={{ width: "100%" }} aria-describedby="example_info">
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Desde</th>
                                    <th>Hasta</th>
                                    <th>Tiempo total</th>
                                    <th>Tiempo usado</th>
                                    <th>Tiempo restante</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};


