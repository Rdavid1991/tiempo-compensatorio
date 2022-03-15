import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { timeToHumanize } from '../../helper';
import db from '../../helper/db';

const initialState = {
    usedHourHistory: [],
    day            : ""
};

export const DetailsTime = ({ employeeKey, id }) => {

    const [data, setUsedHistory] = useState(initialState);

    useEffect(() => {
        const employ = db().getOneEmploy(employeeKey);
        setUsedHistory({
            usedHourHistory: employ.time[id].usedHourHistory,
            day            : employ.time[id].day
        });
    }, [id,employeeKey]);

    return (
        <div className="modal fade" id="details" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="detailsLabel">Horas usadas del {moment(data.day).format("ddd LL")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-2">
                            <div className="col-6">
                                <div className="p-1 border border-dark rounded bg-dark fw-bold">Fecha de uso</div>
                            </div>
                            <div className="col-6">
                                <div className="p-1 border border-dark rounded bg-dark fw-bold">Horas usadas</div>
                            </div>
                        </div>
                        {data.usedHourHistory.length > 0 ? data.usedHourHistory.map((item, index) => (
                            <div className="row g-2 mt-1" key={index}>
                                <div className="col-6">
                                    <div className="p-1 border border-dark rounded bg-dark">{moment(item.date).format("ddd LL")}</div>
                                </div>
                                <div className="col-6">
                                    <div className="p-1 border border-dark rounded bg-dark">{timeToHumanize(moment.duration(item.hours, "hours").asMilliseconds())}</div>
                                </div>
                            </div>
                        )) : "No hay nada que mostrar"}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
