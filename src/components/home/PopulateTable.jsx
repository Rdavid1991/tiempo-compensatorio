import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { timeToString } from '../../helper/'

export const PopulateTable = () => {

    const iterateStorage = () => {
        const rows = []
        let items = ""
        for (const key in localStorage) {

            if (localStorage.hasOwnProperty(key)) {
                items = JSON.parse(localStorage.getItem(key))

                let leftOver = 0, used = 0, total = 0
                items.time.map((item) => {

                    let totalInMilliseconds = 0, usedInMilliseconds = 0, leftOverInMilliseconds = 0;

                    totalInMilliseconds += moment.duration(item.hourTotal, "hours").asMilliseconds();
                    usedInMilliseconds += moment.duration(item.hourUsed, "hours").asMilliseconds()
                    leftOverInMilliseconds += moment.duration(item.hourLeft, "hours").asMilliseconds()

                    total = moment.utc(totalInMilliseconds).format("H:mm")
                    used = moment.utc(usedInMilliseconds).format("H:mm")
                    leftOver = moment.utc(leftOverInMilliseconds).format("H:mm")
                    return true

                })

                rows.push(
                    <tr key={key}>
                        <td>
                            <Link to="/employed" state={{ employeeKey: key }} >{items.name}</Link>
                        </td>
                        <td>{items.department}</td>
                        <td>{timeToString(total)}</td>
                        <td>{timeToString(used)}</td>
                        <td>{timeToString(leftOver)}</td>
                    </tr>
                )
            }
        }

        return rows;
    }

    return (
        <>
            {
                iterateStorage()
            }
        </>
    )
}
