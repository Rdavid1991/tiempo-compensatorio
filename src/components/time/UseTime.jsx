import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal } from "src/utils/Modal";
import db from "../../helper/db";
import { RefreshNotUsedTable } from "./function/ActionTimeTable";
import { handlerFunctions } from "./function/handlerFunctions";

const initialState = {
    hourToUse: "",
    dateOfUse: ""
};

export const UseTime = ({ employeeKey, id } ) => {

    const { handlerUsedTime, handlerUseHours } = handlerFunctions(employeeKey);
    const [usedTime, setUsedTime] = useState(initialState);
    const [dateFrom, setDateFrom] = useState("");

    useEffect(() => {
        const employ = db().getOneEmploy(employeeKey);
        setDateFrom(employ.time[id].day);
    }, [id]);

    return (
        <div className="modal fade" id="useTime">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Usar tiempo del - {moment(dateFrom).format("ddd LL")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const response = await handlerUseHours(id, usedTime);
                        if (response) {
                            Modal.hide("#useTime");
                            setUsedTime(initialState);
                            RefreshNotUsedTable(employeeKey);
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
                            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-sm btn-primary">Usar horas</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};
