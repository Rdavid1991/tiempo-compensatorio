import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { AddTime } from './AddTime';
import moment from 'moment';
import 'moment/locale/es-us';
import { PopulateTable } from './PopulateTable';
import { dataTableSpanish } from '../../helper';
import { DetailsTime } from './DetailsTime';
import { UseTime } from './UseTime';
import { EditTime } from './EditTime';
const { $ } = window;

moment.locale("es");
export const EmployeeTable = () => {

    const useLocationHook = useLocation();
    const { employeeKey } = useLocationHook.state;
    const data = JSON.parse(localStorage.getItem(employeeKey));

    const [indexData, setIndexData] = useState(0);

    useEffect(() => {

        $("#notUsed").DataTable({
            language: { ...dataTableSpanish }
        });
        $("#used").DataTable({
            language: { ...dataTableSpanish }
        });

        $(".pagination").addClass("pagination-sm");
    }, []);

    return (
        <div>
            <>
                <UseTime
                    indexData={indexData}
                    employeeKey={employeeKey}
                    data={data}
                />

                <DetailsTime
                    data={data.time[indexData]}
                />

                <AddTime
                    employeeKey={employeeKey}
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
                />

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
                                <tbody>
                                    <PopulateTable
                                        data={data}
                                        employeeKey={employeeKey}
                                        state={false}
                                        setIndexData={setIndexData}
                                    />
                                </tbody>
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
                                <tbody>
                                    <PopulateTable
                                        data={data}
                                        employeeKey={employeeKey}
                                        state={true}
                                        setIndexData={setIndexData}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </>
        </div>
    );
};
