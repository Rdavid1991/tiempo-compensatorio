import Swal from "sweetalert2"


export const handlerFunctions = (data, employeeKey) => {
    return {
        handlerUsedTime: ({ target }, setUsedTime) => {
            setUsedTime(target.value)
        },

        handlerUseHours: (e, usedTime) => {
            if (data.time[e.target.id].hourLeft < parseInt(usedTime)) {
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


