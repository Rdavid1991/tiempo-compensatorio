import React, { useState } from 'react';
import { handlerFunctions } from './helper/handlerFunctions';

export const UseTime = ({ idTime, employeeKey, data }) => {

    const { handlerUsedTime, handlerUseHours } = handlerFunctions(data, employeeKey);
    const [usedTime, setUsedTime] = useState({
        hourToUse: "",
        dateOfUse: ""
    });

    return (
        <div className="modal fade" id="useTime" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="useTimeLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="useTimeLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handlerUseHours(idTime, usedTime);
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
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateOfUse" className="form-label">Fecha</label>
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    name="dateOfUse"
                                    onChange={(e) => handlerUsedTime(e, setUsedTime, usedTime)}
                                />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-sm btn-primary">Usar horas</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
