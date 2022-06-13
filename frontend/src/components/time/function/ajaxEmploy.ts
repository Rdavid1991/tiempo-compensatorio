import moment from "moment";
import { FunctionarySourceSchema } from "src/interfaces";
import { timeToHumanize } from "../../../helper";
import { AjaxData } from "../../../interfaces/index";

export const ajaxEmploy = (employeeKey : string) => {

    const __info = JSON.parse(
        localStorage.getItem(employeeKey) as string
    ) as FunctionarySourceSchema;
    
    const sourceData = (state : boolean) => {

        const source : AjaxData = { data: [] };
        let totalInMilliseconds, usedInMilliseconds, leftOverInMilliseconds;
        for (let i = 0; i < __info.time.length; i++) {

            if (state === __info.time[i].used) {

                totalInMilliseconds = moment.duration(__info.time[i].hourTotal, "hours").asMilliseconds();
                usedInMilliseconds = moment.duration(__info.time[i].hourUsed, "hours").asMilliseconds();
                leftOverInMilliseconds = moment.duration(__info.time[i].hourLeft, "hours").asMilliseconds();

                source.data.push([
                    `${i}|${moment(__info.time[i].day).format("dddd LL")}|${moment(__info.time[i].day).format("YYYYMMDD")}`,
                    {
                        brute    : moment.duration(__info.time[i].start).asSeconds(),
                        humanize : moment(__info.time[i].start, "hh:mm").format("LT"),
                    },
                    {
                        brute    : moment.duration(__info.time[i].end).asSeconds(),
                        humanize : moment(__info.time[i].end, "hh:mm").format("LT"),
                    },
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
        return sourceData(false);
    };

    const used = () => {
        return sourceData(true);
    };

    return {
        notUsed,
        used
    };
};
