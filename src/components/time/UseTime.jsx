import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../helper/db";
import { handlerFunctions } from "./function/handlerFunctions";

const { ipcRenderer } = window.require("electron");
const initialState = {
    hourToUse: "",
    dateOfUse: ""
};

export const UseTime = () => {

    const { employeeKey, id } = useParams();

    const { handlerUsedTime, handlerUseHours } = handlerFunctions(employeeKey);
    const [usedTime, setUsedTime] = useState(initialState);
    const [dateFrom, setDateFrom] = useState("");

    useEffect(() => {
        const employ = db().getOneEmploy(employeeKey);
        setDateFrom(employ.time[id].day);
    }, [id]);

    return (
        <div className="card overflow-hidden vh-100">
            <div className="card-header row">
                <div className="col-11 drag-header">
                    <h5>Usar tiempo del - {moment(dateFrom).format("ddd LL")}</h5>
                </div>
                <div className="col-1">
                    <button type="button" onClick={close} className="float-end btn btn-close"></button>
                </div>
            </div>

            <form onSubmit={async (e) => {
                e.preventDefault();
                const response = await handlerUseHours(id, usedTime);
                if (response) {
                    ipcRenderer.send("use-time", {
                        command: "refresh-table"
                    });
                    setUsedTime(initialState);
                }
            }}>
                <div className="card-body">

                    <div className="mb-3">
                        <label htmlFor="hourToUse" className="form-label">Horas a usar</label>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            name="hourToUse"
                            step="0.01"
                            min="0"
                            onChange={(e) => handlerUsedTime(e, setUsedTime, usedTime)}
                            value={usedTime.hourToUse}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateOfUse" className="form-label">Fecha</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            name="dateOfUse"
                            onChange={(e) => handlerUsedTime(e, setUsedTime, usedTime)}
                            value={usedTime.dateOfUse}
                            required
                        />
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-sm btn-secondary" onClick={close}>Cerrar</button>
                    <button type="submit" className="btn btn-sm btn-primary">Usar horas</button>
                </div>
            </form>
        </div>

    );
};
