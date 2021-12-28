import moment from 'moment';
import React from 'react';
import { timeToHumanize } from '../../helper';

export const DetailsTime = ({ data }) => {
    return (
        <div className="modal fade" id="details" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="detailsLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="detailsLabel">Horas usadas del {moment(data.day).format("ddd LL")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-2">
                            <div className="col-6">
                                <div className="p-1 border border-dark rounded bg-dark">Fecha de uso</div>
                            </div>
                            <div className="col-6">
                                <div className="p-1 border border-dark rounded bg-dark">Horas usadas</div>
                            </div>
                            {data.usedHourHistory.length > 0 ? data.usedHourHistory.map((item) => (

                                <>
                                    <div className="col-6">
                                        <div className="p-1 border border-dark rounded bg-dark">{moment(item.date).format("ddd LL")}</div>
                                    </div>
                                    <div className="col-6">
                                        <div className="p-1 border border-dark rounded bg-dark">{timeToHumanize(moment.duration(item.hours, "hours").asMilliseconds())}</div>
                                    </div>
                                </>
                            )) : "No hay nada que mostrar"}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
