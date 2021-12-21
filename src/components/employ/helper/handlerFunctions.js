import Swal from "sweetalert2"
import moment from "moment"


export const handlerFunctions = (data, employeeKey) => {


    const evalTime = (left, used) => {
        let leftStr = "", usedStr = "";
        let leftArray = left.toString().split(":");
        let usedArray = used.toString().split(".");

        switch (leftArray.length) {
            case 1:
                leftStr = `${leftArray[0]}:00`
                break;
            case 2:
                leftStr = `${leftArray[0]}:${leftArray[1]}`
                break;
            default:
                break;
        }
        switch (usedArray.length) {
            case 1:
                usedStr = `${usedArray[0]}:00`
                break;
            case 2:
                usedStr = `${usedArray[0]}:${usedArray[1]}`
                break;
            default:
                break;
        }

        console.log("restante", moment.duration(leftStr).asMinutes());
        console.log("usar", moment.duration(usedStr).asMinutes());

        return moment.duration(leftStr).asMinutes() < moment.duration(usedStr).asMinutes() ? false : true
    }

    return {
        handlerUsedTime: ({ target }, setUsedTime) => {
            setUsedTime(target.value)
        },

        handlerUseHours: (e, usedTime) => {
            if (evalTime(data.time[e.target.id].hourLeft, parseInt(usedTime))) {
                Swal.fire(
                    'Lo siento',
                    'No tienes suficientes horas para usar',
                    'error'
                )
            } else {
                data.time[e.target.id].hourUsed = data.time[e.target.id].hourUsed + parseInt(usedTime)
                data.time[e.target.id].hourLeft = data.time[e.target.id].hourLeft - parseInt(usedTime)
                if (data.time[e.target.id].hourLeft <= 0) {
                    data.time[e.target.id].used = true
                }
                localStorage.setItem(employeeKey, JSON.stringify(data))
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Se ${parseInt(usedTime) === 1 ? "ha" : "han"} descontado ${parseInt(usedTime)} ${parseInt(usedTime) === 1 ? "hora" : "horas"} de ${data.name}`,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.reload()
                })
            }
        }
    }
}


