/* eslint-disable no-prototype-builtins */
const db = () => {

    const __data = [];


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
        getAll
    };
};

export default db;
