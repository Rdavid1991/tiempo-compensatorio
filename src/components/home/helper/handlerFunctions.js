import moment from "moment";
import Swal from "sweetalert2";

import { randomId } from "../../../helper";

export const handlerFunctions = () => {
    return {
        handleInfoSave: (e, addEmploy) => {
            e.preventDefault()

            const duration = moment.duration(
                moment(addEmploy.end, "hh").diff(
                    moment(addEmploy.start, "hh")
                )
            )

            let key = randomId()
            let exit = false

            do {
                if (localStorage.hasOwnProperty(key)) {
                    exit = true
                    key = randomId()
                } else {
                    exit = false
                }

            } while (exit);

            localStorage.setItem(key, JSON.stringify({
                name: addEmploy.name,
                department: addEmploy.department,
                time: [{
                    day: addEmploy.day,
                    start: addEmploy.start,
                    end: addEmploy.end,
                    hourTotal: duration.hours(),
                    hourUsed: 0,
                    hourLeft: duration.hours(),
                    used: addEmploy.used
                }]
            }))


            document.querySelector("#addEmployForm").reset()
            window.bootstrap.Modal.getInstance(document.querySelector('#addEmploy'), {}).hide()

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Funcionario gurdado',
                showConfirmButton: false,
                timer: 1000
            }).then(() => {
                window.location.reload()
            })
        }
    }
}
