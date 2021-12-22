import Swal from "sweetalert2"
import moment from "moment"


export const handlerFunctions = (data, employeeKey) => {

    const timeToString = (time) => {
        let timeStr = "";
        let timeArray = ""

        if (new RegExp("\\.").test(time)) {
            timeArray = time.toString().split(".");
        } else if (new RegExp("\\:").test(time)) {
            timeArray = time.toString().split(":");
        } else {
            timeArray = [time]
        }

        switch (timeArray.length) {
            case 1:
                timeStr = `${timeArray[0]}:00`
                break;
            case 2:
                let digit = timeArray[1].toString().length === 1 ? `0${timeArray[1]}` : timeArray[1]
                timeStr = `${timeArray[0]}:${digit}`
                break;
            default:
                break;
        }

        return timeStr
    }

    /**
     * Evalua si el tiempo a usar es mayor al tiempo restante
     * @param {String} leftover Valor menor, con formato hora ejemplo: 12:00
     * @param {String} used Valor mayor, con formato hora ejemplo: 12:00
     * @returns {boolean}
     */
    const evalTime = (leftover, used) => {
        let leftStr = timeToString(leftover)
        let usedStr = timeToString(used);
        return moment.duration(leftStr).asMinutes() < moment.duration(usedStr).asMinutes() ? true : false
    }

    const substractTime = (leftover, used) => {
        let leftStr = timeToString(leftover)
        let usedStr = timeToString(used);

        let leftMinutes = moment.duration(leftStr).asMinutes()
        let usedMinutes = moment.duration(usedStr).asMinutes()

        let timeResult = moment.duration(leftMinutes - usedMinutes, "minutes").asMilliseconds()

        return moment.utc(timeResult).format("H:mm")

    }

    const addTime = (leftover, used) => {
        let leftStr = leftover
        let usedStr = timeToString(used);

        let leftMinutes = moment.duration(leftStr).asMinutes()
        let usedMinutes = moment.duration(usedStr).asMinutes()

        let timeResult = moment.duration(leftMinutes + usedMinutes, "minutes").asMilliseconds()


        return moment.utc(timeResult).format("H:mm")
    }

    return {
        handlerUsedTime: ({ target }, setUsedTime) => {
            setUsedTime(target.value)
        },

        handlerUseHours: (e, usedTime) => {
            if (evalTime(data.time[e.target.id].hourLeft, usedTime)) {
                Swal.fire(
                    'Lo siento',
                    'No tienes suficientes horas para usar',
                    'error'
                )
            } else {
                data.time[e.target.id].hourUsed = addTime(data.time[e.target.id].hourUsed, usedTime)
                data.time[e.target.id].hourLeft = substractTime(data.time[e.target.id].hourLeft, usedTime)

                if (moment.duration(data.time[e.target.id].hourLeft).asMilliseconds() <= 0) {
                    data.time[e.target.id].used = true
                }
                localStorage.setItem(employeeKey, JSON.stringify(data))
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Se ${parseInt(usedTime) === 1 ? "ha" : "han"} descontado ${usedTime} ${moment.duration(timeToString(usedTime)).asHours() === 1 ? "hora" : "horas"} de ${data.name}`,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.reload()
                })
            }
        }
    }
}


