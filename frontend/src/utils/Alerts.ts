import Swal from "sweetalert2";

export const confirmAlert = async (text : string) => {
    return await Swal.fire({
        title             : "¿Estas seguro/a?",
        text              : text,
        icon              : "warning",
        showCancelButton  : true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor : "#d33",
        confirmButtonText : "Si, borrar!",
        cancelButtonText  : "Cancelar"
    });
};

export const successAlert = async (text : string) => {
    return await Swal.fire({
        title            : `Hecho - ${text}`,
        timer            : 1500,
        position         : "top-end",
        icon             : "success",
        showConfirmButton: false,
    });
};

export const errorAlert = async(text : string) => {
    return await Swal.fire({
        title            : `Oops!!! - ${text}`,
        timer            : 1500,
        position         : "top-end",
        icon             : "error",
        showConfirmButton: false,
    });
};