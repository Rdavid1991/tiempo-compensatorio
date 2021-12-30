import moment from "moment";
import { timeToHumanize } from "../../../helper";
import db from "../../../helper/db";

export const ajax = () => {

    const dbLocal = db();

    const sourse = {
        data: []
    };

    for (const item of dbLocal.getAll()) {

        let { key ,data } = item;

        //let leftOver = 0, used = 0, total = 0;
        let totalInMilliseconds = 0, usedInMilliseconds = 0, leftOverInMilliseconds = 0;
        data.time.map((item) => {
            totalInMilliseconds += moment.duration(item.hourTotal, "hours").asMilliseconds();
            usedInMilliseconds += moment.duration(item.hourUsed, "hours").asMilliseconds();
            leftOverInMilliseconds += moment.duration(item.hourLeft, "hours").asMilliseconds();
            return true;
        });

        sourse.data.push([
            `${key}|${data.name}`,
            item.data.department,
            timeToHumanize(totalInMilliseconds),
            timeToHumanize(usedInMilliseconds),
            timeToHumanize(leftOverInMilliseconds),
            key
        ]);
    }

    return sourse;
};