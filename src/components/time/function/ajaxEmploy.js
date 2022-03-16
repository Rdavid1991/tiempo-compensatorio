import moment from "moment";
import { timeToHumanize } from "../../../helper";

export const ajaxEmploy = (employeeKey) => {

    const __info = JSON.parse(localStorage.getItem(employeeKey));

    const sourseData = (state) => {

        let source = { data: [] }; 
        let totalInMilliseconds, usedInMilliseconds, leftOverInMilliseconds;
        for (let i = 0; i < __info.time.length; i++) {

            if (state === __info.time[i].used) {

                totalInMilliseconds = moment.duration(__info.time[i].hourTotal, "hours").asMilliseconds();
                usedInMilliseconds = moment.duration(__info.time[i].hourUsed, "hours").asMilliseconds();
                leftOverInMilliseconds = moment.duration(__info.time[i].hourLeft, "hours").asMilliseconds();

                source.data.push([
                    `${i}|${moment(__info.time[i].day).format("dddd LL")}|${moment(__info.time[i].day).format("YYYYMMDD")}`,
                    moment(__info.time[i].start, "hh:mm").format("LT"),
                    moment(__info.time[i].end, "hh:mm").format("LT"),
                    timeToHumanize(totalInMilliseconds),
                    timeToHumanize(usedInMilliseconds),
                    timeToHumanize(leftOverInMilliseconds),
                    i
                ]);
            }
        }
        return source;
    };

    const notUsed = () => {
        return sourseData(false);
    };

    const used = () => {
        return sourseData(true);
    };

    return {
        notUsed,
        used
    };
};
