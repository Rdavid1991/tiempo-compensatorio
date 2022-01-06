import { dataTableSpanish } from "../../../helper";
import { ajaxEmploy } from "./ajaxEmploy";

const {$} = window;

export const employTables = (employeeKey) => {

    return {
        used: () => {
            return $("#used").DataTable({
                "language"  : { ...dataTableSpanish },
                "aaData"    : ajaxEmploy(employeeKey).used().data,
                "columnDefs": [
                    {
                        targets: [0],
                        render : (item) => {
                            const [index, data] = item.split("|");
                            return `<div style="cursor:pointer" data-click="details" data-index="${index}">${data}</div>`;
                        }
                    }
                ]
            });
        },
        notUsed: () => { 
            return $("#notUsed").DataTable({
                "language"  : { ...dataTableSpanish },
                "aaData"    : ajaxEmploy(employeeKey).notUsed().data,
                "columnDefs": [
                    {
                        targets: [0],
                        render : (item) => {
                            const [index, data] = item.split("|");
                            return `<div style="cursor:pointer" class="text-truncate" data-click="details" data-index="${index}">${data}</div>`;
                        }
                    },
                    {
                        targets: [6],
                        render : (index) => {
                            const html = `<button class="btn btn-sm btn-secondary"  data-click="useTime" data-index="${index}"><i class="fas fa-cogs"></i></button>
                            <button class="btn btn-sm btn-secondary"  data-click="editTime" data-index="${index}"><i class="far fa-edit"></i></button>
                            <button class="btn btn-sm btn-secondary" data-click="delete" data-index="${index}"><i class="far fa-trash-alt"></i></button>`;
                            return html;
                        }
                    }
                ]
            });
        } 
    };
};
