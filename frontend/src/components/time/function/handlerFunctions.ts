/* eslint-disable no-case-declarations */
import Swal from "sweetalert2";
import moment from "moment";
import { substractTime, timeToString } from "../../../helper";
import { UseTimeSchema } from "src/utils/interfaces";
import { ChangeEvent, Dispatch } from "react";

export const handlerFunctions = (employeeKey : string) => {

    /**
     * Evalúa si el tiempo a usar es mayor al tiempo restante
     * @param leftover Valor menor, con formato hora ejemplo: 12:00
     * @param used Valor mayor, con formato hora ejemplo: 12:00
     * @returns 
     */
    const compareDiffTime = (leftover: string, used: string): boolean => {
        const leftStr = timeToString(leftover);
        const usedStr = timeToString(used);
        return moment.duration(leftStr).asMinutes() < moment.duration(usedStr).asMinutes() ? true : false;
    };

    const addTime = (leftover : string, used : string) => {
        const leftStr = leftover;
        const usedStr = timeToString(used);

        const leftMinutes = moment.duration(leftStr).asMinutes();
        const usedMinutes = moment.duration(usedStr).asMinutes();

        const timeResult = moment.duration(leftMinutes + usedMinutes, "minutes").asMilliseconds();


        return moment.utc(timeResult).format("H:mm");
    };

    return {

        handlerUseHours: async (index : number, usedTime: UseTimeSchema ) => {

            const data = JSON.parse(localStorage.getItem(employeeKey) as string);

            if (compareDiffTime(data.time[index].hourLeft, usedTime.hourToUse)) {
                await Swal.fire(
                    "Lo siento",
                    "No tienes suficientes horas para usar",
                    "error"
                );
                return false;
            } else {

                data.time[index].hourUsed = addTime(data.time[index].hourUsed, usedTime.hourToUse);
                data.time[index].hourLeft = substractTime(data.time[index].hourLeft, usedTime.hourToUse);

                if (moment.duration(data.time[index].hourLeft).asMilliseconds() <= 0) {
                    data.time[index].used = true;
                }

                data.time[index].usedHourHistory.push({
                    "date"  : usedTime.dateOfUse,
                    "hours" : timeToString(usedTime.hourToUse)
                });

                localStorage.setItem(employeeKey, JSON.stringify(data));

                await Swal.fire({
                    icon              : "success",
                    position          : "top-end",
                    showConfirmButton : false,
                    timer             : 2000,
                    title             : `Se ${parseInt(usedTime.hourToUse) === 1 ? "ha" : "han"} descontado ${usedTime.hourToUse} ${moment.duration(timeToString(usedTime.hourToUse)).asHours() === 1 ? "hora" : "horas"} de ${data.name}`,
                });

                return true;
            }
        },
        handlerUsedTime: ({ target } : ChangeEvent<HTMLInputElement>, setUsedTime : Dispatch<React.SetStateAction<UseTimeSchema>>, usedTime : UseTimeSchema) => {

            setUsedTime({
                ...usedTime,
                [target.name]: target.value
            });
        }

       
    };
};


