import { ajax } from "./ajax";

const {ipcRenderer} = window.require('electron');

export const ipcRendererEvent = () => {
    
    return {
        refreshTable: (table) => {
            ipcRenderer.on("refresh-table", () => {
                table.clear().rows.add(ajax().data).draw();
                table.columns.adjust().draw();
            });
        } 
    };
};
