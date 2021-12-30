/* eslint-disable no-case-declarations */
import Swal from "sweetalert2";
import moment from "moment";
import { substractTime, timeToString } from "../../../helper";

export const handlerFunctions = (data, employeeKey) => {

    /**
     * Evalua si el tiempo a usar es mayor al tiempo restante
     * @param {String} leftover Valor menor, con formato hora ejemplo: 12:00
     * @param {String} used Valor mayor, con formato hora ejemplo: 12:00
     * @returns {boolean}
     */
    const compareDiffTime = (leftover, used) => {
        let leftStr = timeToString(leftover);
        let usedStr = timeToString(used);
        return moment.duration(leftStr).asMinutes() < moment.duration(usedStr).asMinutes() ? true : false;
    };

    const addTime = (leftover, used) => {
        let leftStr = leftover;
        let usedStr = timeToString(used);

        let leftMinutes = moment.duration(leftStr).asMinutes();
        let usedMinutes = moment.duration(usedStr).asMinutes();

        let timeResult = moment.duration(leftMinutes + usedMinutes, "minutes").asMilliseconds();


        return moment.utc(timeResult).format("H:mm");
    };

    return {
        handlerUsedTime: ({ target }, setUsedTime, usedTime) => {
            setUsedTime({
                ...usedTime,
                [target.name]: target.value
            });
        },

        handlerUseHours: (index, usedTime) => {

            if (compareDiffTime(data.time[index].hourLeft, usedTime.hourToUse)) {
                Swal.fire(
                    'Lo siento',
                    'No tienes suficientes horas para usar',
                    'error'
                );
            } else {

                data.time[index].hourUsed = addTime(data.time[index].hourUsed, usedTime.hourToUse);
                data.time[index].hourLeft = substractTime(data.time[index].hourLeft, usedTime.hourToUse);

                if (moment.duration(data.time[index].hourLeft).asMilliseconds() <= 0) {
                    data.time[index].used = true;
                }

                data.time[index].usedHourHistory.push({
                    "date" : usedTime.dateOfUse,
                    "hours": timeToString(usedTime.hourToUse)
                });

                localStorage.setItem(employeeKey, JSON.stringify(data));
                Swal.fire({
                    position         : 'top-end',
                    icon             : 'success',
                    title            : `Se ${parseInt(usedTime.hourToUse) === 1 ? "ha" : "han"} descontado ${usedTime.hourToUse} ${moment.duration(timeToString(usedTime.hourToUse)).asHours() === 1 ? "hora" : "horas"} de ${data.name}`,
                    showConfirmButton: false,
                    timer            : 2000
                }).then(() => {
                    
                });
            }
        }
    };
};


