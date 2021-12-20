import React from 'react'
import { Link } from 'react-router-dom'

export const PopulateTable = () => {

    const iterateStorage = () => {
        const rows = []
        let items = ""
        for (const key in localStorage) {

            if (localStorage.hasOwnProperty(key)) {
                items = JSON.parse(localStorage.getItem(key))

                let left = 0, used = 0, total = 0
                items.time.map((item) => {

                    total += item.hourTotal
                    used += item.hourUsed
                    left += item.hourLeft
                    return true

                })

                rows.push(
                    <tr key={key}>
                        <td>
                            <Link to="/employed" state={{ employeeKey: key }} >{items.name}</Link>
                        </td>
                        <td>{items.department}</td>
                        <td>{total}</td>
                        <td>{used}</td>
                        <td>{left}</td>
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
