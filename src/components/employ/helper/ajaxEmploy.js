import moment from 'moment';
import { timeToHumanize } from '../../../helper';

export const ajaxEmploy = (data) => {

    const sourseData = (state) => {
        let sourse = { data: [] }, totalInMilliseconds, usedInMilliseconds, leftOverInMilliseconds;
        for (let i = 0; i < data.time.length; i++) {

            if (state === data.time[i].used) {

                totalInMilliseconds = moment.duration(data.time[i].hourTotal, "hours").asMilliseconds();
                usedInMilliseconds = moment.duration(data.time[i].hourUsed, "hours").asMilliseconds();
                leftOverInMilliseconds = moment.duration(data.time[i].hourLeft, "hours").asMilliseconds();

                sourse.data.push([
                    `${i}|${moment(data.time[i].day).format("dddd LL")}`,
                    moment(data.time[i].start, "hh:mm").format("LT"),
                    moment(data.time[i].end, "hh:mm").format("LT"),
                    timeToHumanize(totalInMilliseconds),
                    timeToHumanize(usedInMilliseconds),
                    timeToHumanize(leftOverInMilliseconds),
                    i
                ]);
            }
        }
        return sourse;
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
