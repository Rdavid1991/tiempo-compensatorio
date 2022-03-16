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
import { RenderTimeTableNotUsed, RenderTimeTableUsed } from "./function/ActionTimeTable";
// import { ipcRendererEvent } from "./helper/ipcRendererEvent";
//const { $, bootstrap, require } = window;

//const { ipcRenderer } = require("electron");

const localDB = db();
moment.locale("es");
export const TimeTable = () => {

    const notUsedTable = useRef();
    const usedTable = useRef();
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

    const handleDelete = async () => {
        const isDeleted = await localDB.drop(indexData, employeeKey);
        if (isDeleted) {
            notUsedTable.current.clear().rows.add(ajaxEmploy(employeeKey).notUsed().data).draw();
            notUsedTable.current.columns.adjust().draw();
        }
    };

    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(timeTable.notUsed.table)) {
        timeTable.notUsed.order.listener("#day", 0, (e) => {
            console.log("funciona", e);
            
        });
    }

    const handleActionTable = (e) => {

        const { target } = e;

        switch (target.dataset.click) {
            case "details":
                setIndexData(target.dataset.index);
                var details = new bootstrap.Modal(document.querySelector("#details"), {});
                details.show();
                break;
            case "delete":
                setIndexData(target.dataset.index);
                handleDelete();
                break;
            case "useTime":
                // ipcRenderer.send("use-time", {
                //     command: "open",
                //     id     : target.dataset.index,
                //     employeeKey,
                // });
                break;
            case "editTime":
                // ipcRenderer.send("edit-time", {
                //     command: "open",
                //     id     : target.dataset.index,
                //     employeeKey,
                // });
                break;
            default:
                break;
        }
    };

    return (

        < div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }}>

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


