/* eslint-disable no-constant-condition */
import moment from "moment";
import Swal from "sweetalert2";
import { compareDiffTime, compareDurationTime, randomId, substractTime } from ".";
import { FunctionarySchema, FunctionarySourceSchema, TimeEditSchema } from "../interfaces";
import { FunctionaryEditFormSchema, FunctionaryAddFormSchema } from "../interfaces/index";

/* eslint-disable no-prototype-builtins */

const db = () => {

    const __schemaFunctionary = {
        name       : "",
        department : "",
        time       : []
    };

    const __schemaTime = {
        day             : "",
        start           : "",
        end             : "",
        hourTotal       : "",
        hourUsed        : "",
        hourLeft        : "",
        used            : "",
        usedHourHistory : []
    };

    const insert = async (addEmploy : FunctionaryAddFormSchema) => {
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
            name       : addEmploy.name,
            department : addEmploy.department,
            time       : [{
                ...__schemaTime,
                day             : addEmploy.day,
                start           : addEmploy.start,
                end             : addEmploy.end,
                hourTotal       : moment.utc(duration).format("H:mm"),
                hourUsed        : 0,
                hourLeft        : moment.utc(duration).format("H:mm"),
                used            : addEmploy.used,
                usedHourHistory : []
            }]
        }));

        await Swal.fire({
            position          : "top-end",
            icon              : "success",
            title             : "Funcionario guardado",
            showConfirmButton : false,
            timer             : 1000
        });

        return true;
    };

    const update = async (indexData : number, employeeKey : string, editEmployTime : TimeEditSchema ) => {

        if (compareDiffTime(editEmployTime.start, editEmployTime.end)) {

            const duration = moment.duration(
                moment(editEmployTime.end, "hh:mm").diff(
                    moment(editEmployTime.start, "hh:mm")
                )
            );

            // eslint-disable-next-line no-prototype-builtins
            if (localStorage.hasOwnProperty(employeeKey)) {

                const info = JSON.parse(localStorage.getItem(employeeKey)as string);

                const [totalTime, leftTime] = Array(2).fill(`${duration.hours()}${duration.minutes() > 0 ? `:${duration.minutes()}` : ":00"}`);

                if (compareDurationTime(leftTime, info.time[indexData].hourUsed)) {

                    info.time[indexData] = {
                        ...info.time[indexData],
                        day       : editEmployTime.day,
                        start     : editEmployTime.start,
                        end       : editEmployTime.end,
                        hourTotal : totalTime,
                        hourLeft  : substractTime(leftTime, info.time[indexData].hourUsed)
                    };
                    localStorage.setItem(employeeKey, JSON.stringify(info));

                    await Swal.fire({
                        position          : "top-end",
                        icon              : "success",
                        title             : "Horas actualizadas",
                        showConfirmButton : false,
                        timer             : 1000
                    });

                    return true;

                } else {
                    Swal.fire(
                        "Lo siento",
                        "Las horas restantes son menor al tiempo utilizado. <br>",
                        "error"
                    );
                }
            } else {
                Swal.fire(
                    "Lo siento",
                    "El elemento a editar no existe. <br>",
                    "error"
                );
            }

        } else {
            Swal.fire(
                "Lo siento",
                `No puede ingresar las horas en ese orden. <br>
                    Desde ${moment(editEmployTime.start, "hh:mm").format("LT")} es menor que, Hasta ${moment(editEmployTime.end, "hh:mm").format("LT")}`,
                "error"
            );
        }

        return false;

    };

    const dropTime = async (target:string, indexData : number, employeeKey : string) => {

        if (localStorage.hasOwnProperty(employeeKey)) {

            const info = JSON.parse(localStorage.getItem(employeeKey) as string) as FunctionarySchema;
            const deleted = info.time.splice(indexData, 1);

            if (deleted.length >= 1) {
                localStorage.setItem(employeeKey, JSON.stringify(info));
                return true;
            }
        }
        return false;
    };

    const dropEmploy = async (employeeKey : string) => {

        if (localStorage.hasOwnProperty(employeeKey)) {
            localStorage.removeItem(employeeKey);
            return true;
        }
        return false;
    };

    const updateEmploy = async (employeeKey : string, editEmploy : FunctionaryEditFormSchema) => {

        const info = JSON.parse(localStorage.getItem(employeeKey) as string) as FunctionarySchema;
        info.name = editEmploy.name;
        info.department = editEmploy.department;
        localStorage.setItem(employeeKey, JSON.stringify(info));

        await Swal.fire({
            position          : "top-end",
            icon              : "success",
            title             : "Funcionario Actualizado",
            showConfirmButton : false,
            timer             : 1000

        });

        return true;
    };

    const getOneEmploy = (key : string) => {

        const storageResponse = localStorage.getItem(key) as string;
        return JSON.parse(storageResponse);
    };

    const getAll = () => {

        const __data : Array<{key:string; data: FunctionarySourceSchema}> = [];

        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key !== "style") {
                const item = localStorage.getItem(key);
                if (item !== null) {
                    __data.push({
                        data: JSON.parse(item),
                        key,
                    });     
                }
            }
        }

        return __data;
    };

    return {
        getAll,
        insert,
        update,
        drop: dropTime,
        updateEmploy,
        getOneEmploy,
        dropEmploy
    };
};

export default db;
