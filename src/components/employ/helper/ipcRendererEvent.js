import { ajaxEmploy } from "./ajaxEmploy";

const {ipcRenderer} = window.require("electron");

export const ipcRendererEvent = (employeeKey) => {
    return {
        refreshNotUseTable: (table) => {
            ipcRenderer.on("refresh-table-not-use", () => {
                table.clear().rows.add(ajaxEmploy(employeeKey).notUsed().data).draw();
                table.columns.adjust().draw();
            });
        },
        refreshUseTable: (table) => {
            ipcRenderer.on("refresh-table", () => {
                table.clear().rows.add(ajaxEmploy(employeeKey).used().data).draw();
                table.columns.adjust().draw();
            });
        } 
    };
};
