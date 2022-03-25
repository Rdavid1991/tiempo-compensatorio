/* eslint-disable no-unused-vars */
/* globals bootstrap, $ */
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es-us";
// import { DetailsTime } from "./DetailsTime";
import { ajaxEmploy } from "./function/ajaxEmploy";
import db from "../../helper/db";
import TimeTableUsed from "./TimeTableUsed";
import TimeTableNotUsed from "./TimeTableNotUsed";
import TimeHeader from "./TimeHeader";
import { RefreshNotUsedTable, RefreshUsedTable, RenderTimeTableNotUsed, RenderTimeTableUsed } from "./function/ActionTimeTable";
import TimeEditTime from "./TimeEditTime";
import { showModal } from "src/helper";
import { confirmAlert, errorAlert, successAlert } from "src/utils/Alerts";
import { Modal } from "src/utils/Modal";
import { UseTime } from "./UseTime";
// import { ipcRendererEvent } from "./helper/ipcRendererEvent";
//const { $, bootstrap, require } = window;

//const { ipcRenderer } = require("electron");

const localDB = db();
moment.locale("es");
export const TimeTable = () => {

    const { employeeKey } = useParams();

    const [timeTable, setTimeTable] = useState({
        used   : {},
        notUsed: {}
    });
    const [indexData, setIndexData] = useState(0);
    const [data, setData] = useState(JSON.parse(localStorage.getItem(employeeKey)));

    useEffect(() => {
        setTimeTable({
            used   : RenderTimeTableUsed(employeeKey),
            notUsed: RenderTimeTableNotUsed(employeeKey)
        });

        $(".pagination").addClass("pagination-sm");
    }, []);

    const handleDelete = async (target, index, key) => {

        const { isConfirmed } = await confirmAlert("¿Desea borrar el registro?");

        if (isConfirmed) {
            const isDeleted = await localDB.drop(target, index, key);
            if (isDeleted) {
                var tr = target.closest("tr");
                tr.classList.add("animate__animated", "animate__backOutLeft");
                onanimationend = async (e) => {
                    if (e.animationName === "backOutLeft" && Boolean(target.closest("#notUsed"))) {
                        await successAlert("El registro a sido borrado");
                        RefreshNotUsedTable(key, timeTable.notUsed);
                    }
                };
            } else {
                errorAlert("No se pudo borrar el registro");
            }
        }

    };

    // eslint-disable-next-line no-extra-boolean-cast

    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    const handleActionTable = (e) => {

        const { target } = e;

        switch (target.dataset.click) {
            case "details":
                Modal.show("#details");
                break;
            case "delete":
                handleDelete(target, indexData, employeeKey);
                break;
            case "useTime":
                Modal.show("#useTime");
                break;
            case "editTime":
                Modal.show("#timeEditModal");
                break;
            default:
                break;
        }
        setIndexData(target.dataset.index);
        const { notUsed, used} = timeTable;
        RefreshNotUsedTable(employeeKey, notUsed);
        RefreshUsedTable(employeeKey, used);
    };

    return (

        < div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }}>
            <UseTime
                employeeKey={employeeKey}
                id={indexData}
            />
            <TimeEditTime
                employeeKey={employeeKey}
                id={indexData}
            />
            <TimeHeader name={data.name} timeTable={timeTable} />

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
                        <TimeTableNotUsed />
                    </div>
                    <div className="tab-pane fade" id="usedPane" role="tabpanel" aria-labelledby="profile-tab">
                        <TimeTableUsed />
                    </div>
                </div>
            </div>
        </div >
    );
};


