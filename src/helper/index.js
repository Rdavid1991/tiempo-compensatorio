/* eslint-disable no-case-declarations */
/* eslint-disable no-useless-escape */
import moment from "moment";

const randomId = () => {
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let ranId = "";
    for (let i = 0; i < 6; i++) {
        ranId += str.charAt(Math.floor(Math.random() * str.length));
    }
    return ranId;
};

/**
 * Evalua si el tiempo ingresado es correcto
 * @param {String} start Hora mas temprana
 * @param {String} end Hora mas tardia
 * @returns 
 */
const compareDiffTime = (start, end) => {
    const duration = moment.duration(
        moment(end, "hh:mm").diff(
            moment(start, "hh:mm")
        )
    );
    return duration.hours() < 0 ? false : true;
};

const compareDurationTime = (olderTime, lessTime) => {
    const older = moment.duration(olderTime, "hh:mm").asMilliseconds();
    const less = moment.duration(lessTime, "hh:mm").asMilliseconds();
    return older > less ? true : false;
};

const timeToHumanize = (milliseconds) => {
    if (milliseconds > 0) {

        let realMinutes = 0, realHours = 0, realDays = 0;
        let seconds = milliseconds / 1000;

        let totalMinutes = (seconds / 60);

        let hours = (totalMinutes / 60).toString().split(".");

        if (hours.length > 1) {
            realMinutes = (Number(`0.${hours[1]}`) * 60);
        }

        if (hours[0] > 24) {
            let days = (hours[0] / 24).toString().split(".");

            realDays = days[0];

            if (days.length > 1) {
                realHours = (Number(`0.${days[1]}`) * 24);
            }
        } else {
            realHours = hours[0];
        }

        let stringDays = realDays > 0 ? `${realDays[0]} días ` : "";
        let stringHours = realHours > 0
            ? Math.round(realHours) === 1
                ? `${Math.round(realHours)} hora `
                : `${Math.round(realHours)} horas `
            : "";
        let stringMinutes = realMinutes > 0 ? `${Math.round(realMinutes)} minutos` : "";

        return `${stringDays}${stringHours}${stringMinutes}`;
    } else {
        return "no tiene tiempo";
    }
};

const dataTableSpanish = {
    "processing"    : "Procesando...",
    "lengthMenu"    : "Mostrar _MENU_ registros",
    "zeroRecords"   : "" /* "No se encontraron resultados" */,
    "emptyTable"    : "" /* "Ningún dato disponible en esta tabla" */,
    "infoEmpty"     : "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered"  : "(filtrado de un total de _MAX_ registros)",
    "search"        : "Buscar:",
    "infoThousands" : ",",
    "loadingRecords": "Cargando...",
    "paginate"      : {
        "first"   : "Primero",
        "last"    : "Último",
        "next"    : "Siguiente",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending" : ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy"         : "Copiar",
        "colvis"       : "Visibilidad",
        "collection"   : "Colección",
        "colvisRestore": "Restaurar visibilidad",
        "copyKeys"     : "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
        "copySuccess"  : {
            "1": "Copiada 1 fila al portapapeles",
            "_": "Copiadas %d fila al portapapeles"
        },
        "copyTitle" : "Copiar al portapapeles",
        "csv"       : "CSV",
        "excel"     : "Excel",
        "pageLength": {
            "-1": "Mostrar todas las filas",
            "1" : "Mostrar 1 fila",
            "_" : "Mostrar %d filas"
        },
        "pdf"  : "PDF",
        "print": "Imprimir"
    },
    "autoFill": {
        "cancel"        : "Cancelar",
        "fill"          : "Rellene todas las celdas con <i>%d<\/i>",
        "fillHorizontal": "Rellenar celdas horizontalmente",
        "fillVertical"  : "Rellenar celdas verticalmentemente"
    },
    "decimal"      : ",",
    "searchBuilder": {
        "add"   : "Añadir condición",
        "button": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "clearAll"  : "Borrar todo",
        "condition" : "Condición",
        "conditions": {
            "date": {
                "after"     : "Despues",
                "before"    : "Antes",
                "between"   : "Entre",
                "empty"     : "Vacío",
                "equals"    : "Igual a",
                "notBetween": "No entre",
                "notEmpty"  : "No Vacío",
                "not"       : "Diferente de"
            },
            "number": {
                "between"   : "Entre",
                "empty"     : "Vacío",
                "equals"    : "Igual a",
                "gt"        : "Mayor a",
                "gte"       : "Mayor o igual a",
                "lt"        : "Menor que",
                "lte"       : "Menor o igual que",
                "notBetween": "No entre",
                "notEmpty"  : "No vacío",
                "not"       : "Diferente de"
            },
            "string": {
                "contains"  : "Contiene",
                "empty"     : "Vacío",
                "endsWith"  : "Termina en",
                "equals"    : "Igual a",
                "notEmpty"  : "No Vacío",
                "startsWith": "Empieza con",
                "not"       : "Diferente de"
            },
            "array": {
                "not"     : "Diferente de",
                "equals"  : "Igual",
                "empty"   : "Vacío",
                "contains": "Contiene",
                "notEmpty": "No Vacío",
                "without" : "Sin"
            }
        },
        "data"       : "Data",
        "deleteTitle": "Eliminar regla de filtrado",
        "leftTitle"  : "Criterios anulados",
        "logicAnd"   : "Y",
        "logicOr"    : "O",
        "rightTitle" : "Criterios de sangría",
        "title"      : {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "value": "Valor"
    },
    "searchPanes": {
        "clearMessage": "Borrar todo",
        "collapse"    : {
            "0": "Paneles de búsqueda",
            "_": "Paneles de búsqueda (%d)"
        },
        "count"        : "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes"   : "Sin paneles de búsqueda",
        "loadMessage"  : "Cargando paneles de búsqueda",
        "title"        : "Filtros Activos - %d"
    },
    "select": {
        "1"    : "%d fila seleccionada",
        "_"    : "%d filas seleccionadas",
        "cells": {
            "1": "1 celda seleccionada",
            "_": "$d celdas seleccionadas"
        },
        "columns": {
            "1": "1 columna seleccionada",
            "_": "%d columnas seleccionadas"
        },
        "rows": {
            "1": "1 fila seleccionada",
            "_": "%d filas seleccionadas"
        }
    },
    "thousands": ".",
    "datetime" : {
        "previous": "Anterior",
        "next"    : "Proximo",
        "hours"   : "Horas",
        "minutes" : "Minutos",
        "seconds" : "Segundos",
        "unknown" : "-",
        "amPm"    : [
            "am",
            "pm"
        ]
    },
    "editor": {
        "close" : "Cerrar",
        "create": {
            "button": "Nuevo",
            "title" : "Crear Nuevo Registro",
            "submit": "Crear"
        },
        "edit": {
            "button": "Editar",
            "title" : "Editar Registro",
            "submit": "Actualizar"
        },
        "remove": {
            "button" : "Eliminar",
            "title"  : "Eliminar Registro",
            "submit" : "Eliminar",
            "confirm": {
                "_": "¿Está seguro que desea eliminar %d filas?",
                "1": "¿Está seguro que desea eliminar 1 fila?"
            }
        },
        "error": {
            "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
        },
        "multi": {
            "title"  : "Múltiples Valores",
            "info"   : "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
            "restore": "Deshacer Cambios",
            "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
        }
    },
    "info": "Mostrando de _START_ a _END_ de _TOTAL_ entradas"
};

/**
    * Convierte los numeros en string de horas ejemplo: 1 en 1:00, 1.25 en 1:25 
    * @param {number|string} time 
    * @returns {String} Texto en hora ejemplo entrada 1, salida 1:00
    */
const timeToString = (time) => {
    let timeStr = "";
    let timeArray = "";

    if (new RegExp("\\.").test(time)) {
        timeArray = time.toString().split(".");
    } else if (new RegExp("\\:").test(time)) {
        timeArray = time.toString().split(":");
    } else {
        timeArray = [time];
    }

    switch (timeArray.length) {
        case 1:
            timeStr = `${timeArray[0]}:00`;
            break;
        case 2:
            let digit = timeArray[1].toString().length === 1 ? `0${timeArray[1]}` : timeArray[1];
            timeStr = `${timeArray[0]}:${digit}`;
            break;
        default:
            break;
    }

    return timeStr;
};

const substractTime = (leftover, used) => {
    let leftStr = timeToString(leftover);
    let usedStr = timeToString(used);

    let leftMinutes = moment.duration(leftStr).asMinutes();
    let usedMinutes = moment.duration(usedStr).asMinutes();

    let timeResult = moment.duration(leftMinutes - usedMinutes, "minutes").asMilliseconds();

    return moment.utc(timeResult).format("H:mm");

};



export {
    randomId,
    dataTableSpanish,
    compareDiffTime,
    timeToHumanize,
    compareDurationTime,
    substractTime,
    timeToString
};