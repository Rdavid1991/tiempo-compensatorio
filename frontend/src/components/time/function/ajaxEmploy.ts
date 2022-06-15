import moment from "moment";
import { FunctionarySourceSchema } from "src/utils/interfaces";
import { timeToHumanize } from "../../../helper";
import { AjaxData, FilterStateSchema } from "../../../utils/interfaces/index";

export const ajaxEmploy = (employeeKey : string, filter : FilterStateSchema) => {

    const __info = JSON.parse(
        localStorage.getItem(employeeKey) as string
    ) as FunctionarySourceSchema;
    
    const sourceData = (state : boolean) => {

        const source : AjaxData = { data: [] };
        let totalInMilliseconds, usedInMilliseconds, leftOverInMilliseconds;
        for (let i = 0; i < __info.time.length; i++) {

            const date = new Date(`${__info.time[i].day} ${__info.time[i].start}`);
            const monthOfData = date.getMonth();
            const yearOfData = date.getFullYear();

            if (state === __info.time[i].used && (monthOfData  === filter.month || filter.month===100 ) && (yearOfData === filter.year || filter.year === 100)) {

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
        console.log("🚀 ~ file: ajaxEmploy.ts ~ line 43 ~ sourceData ~ source", source);
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
