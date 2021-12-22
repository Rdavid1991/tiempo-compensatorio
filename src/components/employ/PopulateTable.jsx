import moment from 'moment'
import { useState } from 'react';
import { timeToString } from '../../helper';
import { handlerFunctions } from './helper/handlerFunctions';
const { bootstrap } = window


export const PopulateTable = ({ data, employeeKey, state, setIdTime }) => {

    const showDetails = (iter) => {
        var details = new bootstrap.Modal(document.querySelector('#details'), {})
        details.show();
    }

    const iterateInfo = () => {
        let rows = [];
        for (let i = 0; i < data.time.length; i++) {

            if (state === data.time[i].used) {

                let total = data.time[i].hourTotal.toString().split(":")
                let left = data.time[i].hourTotal.toString().split(":")

                rows.push(
                    <tr
                        key={i}
                    >
                        <td
                            style={{ "cursor": "pointer" }}
                            onClick={(e) => showDetails(i)}
                        >{moment(data.time[i].day).format("dddd LL")}</td>
                        <td>{moment(data.time[i].start, "hh:mm").format("LT")}</td>
                        <td>{moment(data.time[i].end, "hh:mm").format("LT")}</td>
                        <td>{timeToString(data.time[i].hourTotal)}</td>
                        <td>{timeToString(data.time[i].hourUsed)}</td>
                        <td>{timeToString(data.time[i].hourLeft)}</td>
                        {
                            data.time[i].used ?
                                null
                                :
                                <td>

                                    <button
                                        className="btn btn-sm btn-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#useTime"
                                        onClick={() => { setIdTime(i) }}
                                    >
                                        usar
                                    </button>

                                </td>
                        }
                    </tr>
                )
            }
        }

        return rows
    }

    return (
        <>
            {
                iterateInfo()
            }
        </>
    );
}


