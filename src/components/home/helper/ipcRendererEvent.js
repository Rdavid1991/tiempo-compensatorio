import { ajax } from "./ajax";

const {ipcRenderer} = window.require('electron');

export const ipcRendererEvent = () => {
    
    return {
        createEmploy: (table) => {
            ipcRenderer.on("crate-employ", () => {
                console.log("se ejecuta el refresco");
                table.clear().rows.add(ajax().data).draw();
                table.columns.adjust().draw();
            });
        } 
    };
};
