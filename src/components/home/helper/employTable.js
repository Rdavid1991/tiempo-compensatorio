import { dataTableSpanish } from "../../../helper";
import { ajax } from "./ajax";

export const employTable = () => {
    return window.$("#example").DataTable({
        language    : { ...dataTableSpanish },
        "aaData"    : ajax().data,
        "retrieve"  : true,
        "columnDefs": [
            {
                targets: [0],
                render : function (data) {
                    const index = data.split("|");
                    return `<a href="#/employed/${index[0]}" class="text-truncate">${index[1]}</a>`;
                }
            },
            {
                targets: [5],
                render : (key) => {
                    const html = `<button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#editEmploy" data-click="edit" data-index="${key}"><i class="far fa-edit"></i></button>
                                    <button class="btn btn-sm btn-secondary" data-click="delete" data-index="${key}"><i class="far fa-trash-alt"></i></button>`;
                    return html;
                }
            }
        ]
    });
};
