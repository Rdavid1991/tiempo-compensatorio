import moment from "moment";
import { randomId } from ".";

/* eslint-disable no-prototype-builtins */
const db = () => {

    const __schemaFunctionary = {
        name      : "",
        department: "",
        time      : []
    };

    const __schemaTime = {
        day            : "",
        start          : "",
        end            : "",
        hourTotal      : "",
        hourUsed       : "",
        hourLeft       : "",
        used           : "",
        usedHourHistory: []
    };


    const __data = [];

    const insert = (addEmploy) => {
        const duration = moment.duration(
            moment(addEmploy.end, "hh:mm").diff(
                moment(addEmploy.start, "hh:mm")
            )
        ).asMilliseconds();

        let key = randomId();
        let exit = false;

        do {
            if (localStorage.hasOwnProperty(key)) {
                exit = true;
                key = randomId();
            } else {
                exit = false;
            }

        } while (exit);

        localStorage.setItem(key, JSON.stringify({
            ...__schemaFunctionary,
            name      : addEmploy.name,
            department: addEmploy.department,
            time      : [{
                ...__schemaTime,
                day            : addEmploy.day,
                start          : addEmploy.start,
                end            : addEmploy.end,
                hourTotal      : moment.utc(duration).format("H:mm"),
                hourUsed       : 0,
                hourLeft       : moment.utc(duration).format("H:mm"),
                used           : addEmploy.used,
                usedHourHistory: []
            }]
        }));
    };

    const getAll = () => {
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                __data.push({
                    key,
                    data: JSON.parse(localStorage.getItem(key))
                });
            }
        }

        return __data;
    };

    return {
        getAll,
        insert
    };
};

export default db;
