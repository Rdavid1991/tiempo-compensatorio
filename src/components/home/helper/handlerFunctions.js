/* eslint-disable no-prototype-builtins */
import db from "../../../helper/db";

export const handlerFunctions = () => {
   
    return {
        saveInfo: (addEmploy, ) => {
            
            db().insert(addEmploy);

            document.querySelector("#addEmployForm").reset();
            window.bootstrap.Modal.getInstance(document.querySelector('#addEmploy'), {}).hide();
        }
    };
};
