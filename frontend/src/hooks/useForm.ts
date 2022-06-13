import { ChangeEvent, useState } from "react";

type HandleInputChange = ChangeEvent<HTMLSelectElement | HTMLInputElement>

export const useForm = <T>(initialState : T) => {

    const [values, setValues] = useState<T>(initialState);

    const reset = () => {
        setValues(initialState);
    };

    const handleInputChange = ({ target } : HandleInputChange ) => {

        setValues({
            ...values,
            [target.name || target.id]: target.value
        });

    };

    return { 
        handleInputChange,
        reset ,
        setValues, 
        values,
    };
};