/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AddTime } from './AddTime';
import moment from 'moment';
import 'moment/locale/es-us';
import { dataTableSpanish } from '../../helper';
import { DetailsTime } from './DetailsTime';
import { UseTime } from './UseTime';
import { EditTime } from './EditTime';
import { ajaxEmploy } from './helper/ajaxEmploy';
import db from '../../helper/db';
const { $, bootstrap } = window;

const localDB = db();
moment.locale("es");
export const EmployeeTable = () => {



    const { employeeKey } = useParams();
    const data = JSON.parse(localStorage.getItem(employeeKey));
    const [indexData, setIndexData] = useState(0);

    useEffect(() => {

        $("#used").DataTable({
            language: { ...dataTableSpanish }
        });
        $("#notUsed").DataTable({
            language    : { ...dataTableSpanish },
            "aaData"    : ajaxEmploy(data).notUsed().data,
            "columnDefs": [
                {
                    targets: [0],
                    render : (item, a, b, c) => {

                        let divElement = document.querySelector("#portals");
                        const [index, data] = item.split("|");

                        ReactDOM.createPortal(
                            <>
                                <button
                                    style={{ "cursor": "pointer" }}
                                    onClick={() => {
                                        showDetails(index);
                                        console.log("se ejecuta");
                                    }}
                                >
                                    {data}
                                </button>
                            </>,
                            document.getElementById("portals")
                        );



                        return divElement.outerHTML;
                    }
                },
                {
                    targets: [6],
                    render : (index) => {
                        const html = (
                            <>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#useTime"
                                    onClick={() => setIndexData(index)}
                                >
                                    usar
                                </button>

                                <button
                                    className="btn btn-sm btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editEmployTime"
                                    onClick={() => setIndexData(index)}
                                >
                                    editar
                                </button>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => handleDelete(index)}
                                >
                                    borrar
                                </button>
                            </>
                        );

                        return html;
                    }
                }
            ]
        });

        $(".pagination").addClass("pagination-sm");
    }, []);

    const handleDelete = (index) => {
        localDB.drop(index, employeeKey);
    };

    const showDetails = (index) => {
        var details = new bootstrap.Modal(document.querySelector('#details'), {});
        details.show();
        console.log("se ejecuta");
        setIndexData(index);
    };

    return (
        <div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }}>
            <UseTime
                indexData={indexData}
                employeeKey={employeeKey}
                data={data}
            />

            <AddTime
                employeeKey={employeeKey}
            />

            {
                data.time.length > 0
                    ?
                    <>
                        <EditTime
                            employeeKey={employeeKey}
                            editState={{
                                day  : data.time[indexData].day,
                                start: data.time[indexData].start,
                                end  : data.time[indexData].end,
                                used : false
                            }}
                            indexData={indexData}
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
                Atras
            </Link>

            <button
                className="btn btn-sm btn-success mx-3"
                data-bs-toggle="modal"
                data-bs-target="#addEmployTime"
            >
                Agregar hora
            </button>

            <div className="mt-3">

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#NotUsedPane" type="button" role="tab" aria-controls="home" aria-selected="true">Horas disponibles</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#usedPane" type="button" role="tab" aria-controls="profile" aria-selected="false">Horas usadas</button>
                    </li>
                </ul>
                <div className="tab-content mt-4" id="myTabContent">
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
        </div>
    );
};
