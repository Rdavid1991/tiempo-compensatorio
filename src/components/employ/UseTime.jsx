import moment from 'moment';
import React, { useState } from 'react';
import { ajaxEmploy } from './helper/ajaxEmploy';
import { handlerFunctions } from './helper/handlerFunctions';

const {bootstrap} = window;
const initialState = {
    hourToUse: "",
    dateOfUse: ""
};

export const UseTime = ({ indexData, employeeKey, notUsedTable, refreshHistoryUsedTime, dateFrom }) => {
    
    const { handlerUsedTime, handlerUseHours } = handlerFunctions(employeeKey);
    const [usedTime, setUsedTime] = useState(initialState);

    return (
        <div className="modal fade" id="useTime" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="useTimeLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="useTimeLabel">Usar horas del {moment(dateFrom).format("ddd LL")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const response = await handlerUseHours(indexData, usedTime);
                        if (response) {
                            notUsedTable.current.clear().rows.add(ajaxEmploy(employeeKey).notUsed().data).draw();
                            notUsedTable.current.columns.adjust().draw();
                            bootstrap.Modal.getInstance(document.querySelector('#useTime'), {}).hide();
                            setUsedTime(initialState);
                            refreshHistoryUsedTime();
                        }
                    }}>
                        <div className="modal-body">

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
