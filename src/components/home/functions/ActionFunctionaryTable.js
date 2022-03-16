import React from "react";
import { renderToString } from "react-dom/server";
import { dataTableSpanish } from "../../../helper";
import { ajax } from "./ajax";


export const RenderFunctionaryTable = () => {

    const LinkToFunctionaryDetails = ({ index }) => {
        return (
            <a href={`#/employed/${index[0]}`} className="text-truncate">{index[1]}</a>
        );
    };

    const ButtonActionsFunctionary = ({id}) => {
        return (
            <>
                <button
                    className="btn btn-sm btn-secondary"
                    data-click="edit"
                    data-index={id}
                >
                    <i className="far fa-edit"></i>
                </button>
                <button
                    className="btn btn-sm btn-secondary"
                    data-click="delete"
                    data-index={id}
                >
                    <i className="far fa-trash-alt"></i>
                </button>
            </>
        );
    };

    return window.$("#example").DataTable({
        language    : { ...dataTableSpanish },
        "aaData"    : ajax().data,
        "retrieve"  : true,
        "columnDefs": [
            {
                targets: [0],
                render : function (data) {
                    const index = data.split("|");
                    return renderToString(
                        <LinkToFunctionaryDetails
                            index={index}
                        />
                    );
                }
            },
            {
                targets: [5],
                render : (id) => {
                    const html = renderToString(
                        <ButtonActionsFunctionary
                            id={id}
                        />
                    );
                    return html;
                }
            }
        ]
    });
};

export const RefreshFunctionaryTable = (table) => {
    table.clear().rows.add(ajax().data).draw();
    table.columns.adjust().draw();
};
