import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { timeToString } from '../../helper/';
import db from '../../helper/db';

const dbLocal = db();

export const PopulateTable = () => {

    const iterateStorage = () => {
        const rows = [];

        for (const item of dbLocal.getAll()) {

            let { key, data } = item;

            let leftOver = 0, used = 0, total = 0;
            let totalInMilliseconds = 0, usedInMilliseconds = 0, leftOverInMilliseconds = 0;
            data.time.map((item) => {

                totalInMilliseconds += moment.duration(item.hourTotal, "hours").asMilliseconds();
                usedInMilliseconds += moment.duration(item.hourUsed, "hours").asMilliseconds();
                leftOverInMilliseconds += moment.duration(item.hourLeft, "hours").asMilliseconds();

                total = moment.utc(totalInMilliseconds).format("H:mm");
                used = moment.utc(usedInMilliseconds).format("H:mm");
                leftOver = moment.utc(leftOverInMilliseconds).format("H:mm");
                return true;

            });

            rows.push(
                <tr key={key}>
                    <td>
                        <Link to="/employed" state={{ employeeKey: key }} >{data.name}</Link>
                    </td>
                    <td>{data.department}</td>
                    <td>{timeToString(total)}</td>
                    <td>{timeToString(used)}</td>
                    <td>{timeToString(leftOver)}</td>
                </tr>
            );

        }

        return rows;
    };

    return (
        <>
            {
                iterateStorage()
            }
        </>
    );
};
