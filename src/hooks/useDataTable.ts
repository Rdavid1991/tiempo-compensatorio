import { useState, useEffect } from "react";

/**
 * 
 * @param {Object} dataTable 
 */
export const useDataTable = (dataTable) => {

    const [table, setTable] = useState({});

    useEffect(() => {
        setTable(dataTable);
    }, []);

    const refresh = () => {
        window.table= table;
        //table.ajax.reload();
    };

    return [refresh];
};