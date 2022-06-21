import moment from "moment";
import { timeToHumanize } from "../../helper";
import db from "../../helper/db";

export const sourceDataFunctionary = () => {

    const dbLocal = db();

    const source :{data:Array<Array<string>>} = {
        data: []
    };

    for (const item of dbLocal.getAll()) {

        const { key ,data } = item;

        //let leftOver = 0, used = 0, total = 0;
        let totalInMilliseconds = 0, usedInMilliseconds = 0, leftOverInMilliseconds = 0;
        data.time.map((elem) => {
            totalInMilliseconds += moment.duration(elem.hourTotal, "hours").asMilliseconds();
            usedInMilliseconds += moment.duration(elem.hourUsed, "hours").asMilliseconds();
            leftOverInMilliseconds += moment.duration(elem.hourLeft, "hours").asMilliseconds();
            return true;
        });

        source.data.push([
            `${key}|${data.name}`,
            item.data.department,
            timeToHumanize(totalInMilliseconds),
            timeToHumanize(usedInMilliseconds),
            timeToHumanize(leftOverInMilliseconds),
            key
        ]);
    }

    return source;
};