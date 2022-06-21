
import React from "react";
import { renderToString } from "react-dom/server";
import { dataTableSpanish } from "../../helper";
import { sourceDataFunctionary } from "../../utils/functions/sourceDataFunctionary";

const ButtonActionsFunctionary = ({ id }: { id: string }) => {
    return (
        <>
            <button
                type="button"
                title="editar"
                className="btn btn-sm btn-secondary"
                data-click="edit"
                data-index={id}
            >
                <i className="far fa-edit"></i>
            </button>
            <button
                type="button"
                title="borrar"
                className="btn btn-sm btn-secondary"
                data-click="delete"
                data-index={id}
            >
                <i className="far fa-trash-alt"></i>
            </button>
        </>
    );
};

const LinkToFunctionaryDetails = ({ index }: { index: Array<string> }) => {
    return <a href={`#/employed/${index[0]}`} className="text-truncate">{index[1]}</a>;
};

export const RenderFunctionaryTable = () => {

    return $("#functionaries").DataTable({
        language : { ...dataTableSpanish },
        "ajax"   : function (data, callback, settings) {
            callback(sourceDataFunctionary());
        }
        ,
        "columnDefs": [
            {
                render: function (data: string) {
                    const index = data.split("|");
                    return renderToString(
                        <LinkToFunctionaryDetails {...{ index }} />
                    );
                },
                targets: [0],
            },
            {
                render: (id: string) => {
                    const html = renderToString(
                        <ButtonActionsFunctionary {...{ id }} />
                    );
                    return html;
                },
                targets: [5]
            }
        ]
    });
};