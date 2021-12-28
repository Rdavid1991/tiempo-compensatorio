import moment from "moment";
import Swal from "sweetalert2";
import { compareDiffTime, compareDurationTime, randomId, substractTime } from ".";
const { bootstrap } = window;

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

    const update = (indexData, employeeKey, editEmployTime) => {
        if (compareDiffTime(editEmployTime.start, editEmployTime.end)) {

            const duration = moment.duration(
                moment(editEmployTime.end, "hh:mm").diff(
                    moment(editEmployTime.start, "hh:mm")
                )
            );

            // eslint-disable-next-line no-prototype-builtins
            if (localStorage.hasOwnProperty(employeeKey)) {
                const info = JSON.parse(localStorage.getItem(employeeKey));

                const [totalTime, leftTime] = Array(2).fill(`${duration.hours()}${duration.minutes() > 0 ? `:${duration.minutes()}` : ":00"}`);

                if (compareDurationTime(leftTime, info.time[indexData].hourUsed)) {

                    info.time[indexData] = {
                        ...info.time[indexData],
                        day      : editEmployTime.day,
                        start    : editEmployTime.start,
                        end      : editEmployTime.end,
                        hourTotal: totalTime,
                        hourLeft : substractTime(leftTime, info.time[indexData].hourUsed)
                    };
                    localStorage.setItem(employeeKey, JSON.stringify(info));

                    bootstrap.Modal.getInstance(document.querySelector('#editEmployTime'), {}).hide();
                    Swal.fire({
                        position         : 'top-end',
                        icon             : 'success',
                        title            : 'Horas actualizadas',
                        showConfirmButton: false,
                        timer            : 1000
                    }).then(() => {
                        location.reload();
                    });

                } else {
                    Swal.fire(
                        'Lo siento',
                        `Las horas restantes son menor al tiempo utilizado. <br>`,
                        'error'
                    );
                }
            }

        } else {
            Swal.fire(
                'Lo siento',
                `No puede ingresar las horas en ese orden. <br>
                    Desde ${moment(editEmployTime.start, "hh:mm").format("LT")} es menor que, Hasta ${moment(editEmployTime.end, "hh:mm").format("LT")}`,
                'error'
            );
        }

    };

    const drop = (indexData, employeeKey,) => {

        if (localStorage.hasOwnProperty(employeeKey)) {

            Swal.fire({
                title             : '¿Estas seguro/a?',
                text              : "Desea borrar el registro",
                icon              : 'warning',
                showCancelButton  : true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor : '#d33',
                confirmButtonText : 'Si, borrar!',
                cancelButtonText  : 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const info = JSON.parse(localStorage.getItem(employeeKey));

                    const deleted = info.time.splice(indexData, indexData);

                    if (deleted.length >= 1) {
                        localStorage.setItem(employeeKey, JSON.stringify(info));
                        Swal.fire(
                            'Borrado!',
                            'El registro a sido borrado!',
                            'success'
                        ).then(() => {
                            location.reload();
                        });
                    }
                }
            });
        }
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
        insert,
        update,
        drop
    };
};

export default db;
