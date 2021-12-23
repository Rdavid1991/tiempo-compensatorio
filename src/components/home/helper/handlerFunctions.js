/* eslint-disable no-prototype-builtins */

import Swal from "sweetalert2";
import db from "../../../helper/db";

export const handlerFunctions = () => {
   

    return {
        handleInfoSave: (e, addEmploy) => {
            e.preventDefault();

            db().insert(addEmploy);

            document.querySelector("#addEmployForm").reset();
            window.bootstrap.Modal.getInstance(document.querySelector('#addEmploy'), {}).hide();

            Swal.fire({
                position         : 'top-end',
                icon             : 'success',
                title            : 'Funcionario gurdado',
                showConfirmButton: false,
                timer            : 1000
            }).then(() => {
                window.location.reload();
            });
        }
    };
};
