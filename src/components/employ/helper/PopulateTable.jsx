import moment from 'moment'
import { useState } from 'react';
import { timeToString } from '../../../helper';
import { handlerFunctions } from './handlerFunctions';


export const PopulateTable = ({ data, employeeKey, state }) => {
    const { handlerUsedTime, handlerUseHours } = handlerFunctions(data, employeeKey)
    const [usedTime, setUsedTime] = useState(0)

    const iterateInfo = () => {
        let rows = [];
        for (let i = 0; i < data.time.length; i++) {

            if (state === data.time[i].used) {

                let total = data.time[i].hourTotal.toString().split(":")
                let left = data.time[i].hourTotal.toString().split(":")

                rows.push(
                    <tr key={i}>
                        <td>{moment(data.time[i].day).format("dddd LL")}</td>
                        <td>{moment(data.time[i].start, "hh:mm").format("LT")}</td>
                        <td>{moment(data.time[i].end, "hh:mm").format("LT")}</td>
                        <td>{timeToString(data.time[i].hourLeft)}</td>
                        <td>{timeToString(data.time[i].hourUsed)}</td>
                        <td>{timeToString(data.time[i].hourTotal)}</td>
                        {
                            data.time[i].used ?
                                null
                                :
                                <td>
                                    <div className="d-flex">
                                        <div className="input-group-sm d-flex">
                                            <input
                                                type="number"
                                                className="form-control form-control-sm"
                                                min="0"
                                                name="time"
                                                onChange={(e) => handlerUsedTime(e, setUsedTime)}
                                            />
                                            <div className="input-group-text">Hora/s</div>

                                        </div>
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={(e) => handlerUseHours(e, usedTime)}
                                            id={i}
                                        >
                                            usar
                                        </button>
                                    </div>
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


