import moment from 'moment';
import React from 'react';
import { timeToHumanize } from '../../helper';

const { bootstrap } = window;


export const PopulateTable = ({ data, state, setIndexData }) => {

    const showDetails = (index) => {
        var details = new bootstrap.Modal(document.querySelector('#details'), {});
        details.show();
        setIndexData(index);
    };

    const iterateInfo = () => {
        let rows = [], totalInMilliseconds, usedInMilliseconds, leftOverInMilliseconds;
        for (let i = 0; i < data.time.length; i++) {

            if (state === data.time[i].used) {

                totalInMilliseconds = moment.duration(data.time[i].hourTotal, "hours").asMilliseconds();
                usedInMilliseconds = moment.duration(data.time[i].hourUsed, "hours").asMilliseconds();
                leftOverInMilliseconds = moment.duration(data.time[i].hourLeft, "hours").asMilliseconds();

                rows.push(
                    <tr
                        key={i}
                    >
                        <td
                            style={{ "cursor": "pointer" }}
                            onClick={() => showDetails(i)}
                        >{moment(data.time[i].day).format("dddd LL")}</td>
                        <td>{moment(data.time[i].start, "hh:mm").format("LT")}</td>
                        <td>{moment(data.time[i].end, "hh:mm").format("LT")}</td>
                        <td>{timeToHumanize(totalInMilliseconds)}</td>
                        <td>{timeToHumanize(usedInMilliseconds)}</td>
                        <td>{timeToHumanize(leftOverInMilliseconds)}</td>
                        {
                            data.time[i].used ?
                                null
                                :
                                <td>

                                    <button
                                        className="btn btn-sm btn-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#useTime"
                                        onClick={() => setIndexData(i)}
                                    >
                                        usar
                                    </button>

                                    <button
                                        className="btn btn-sm btn-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editEmployTime"
                                        onClick={() => setIndexData(i)}
                                    >
                                        editar
                                    </button>

                                </td>
                        }
                    </tr>
                );
            }
        }

        return rows;
    };

    return (
        <>
            {
                iterateInfo()
            }
        </>
    );
};


