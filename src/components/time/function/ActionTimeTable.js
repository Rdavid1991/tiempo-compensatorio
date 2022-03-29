/* global $ */
import React from "react";
import { renderToString } from "react-dom/server";
import { ajaxEmploy } from "./ajaxEmploy";
import { dataTableSpanish } from "src/helper";


const OpenDetails = ({ index, data, dateOrder }) => {
    return (
        <React.Fragment>
            <div style={{ cursor: "pointer" }} data-click="details" data-index={index}>
                <span className="d-none">{dateOrder}</span>
                {data}
            </div>
        </React.Fragment>
    );
};


const ColumnsCustomOrder = ({ humanize, brute }) => {
    return (
        <React.Fragment>
            <span className="d-none">{brute}</span>{humanize}
        </React.Fragment>
    );
};


const ActionTableButton = ({ index }) => {
    return (
        <React.Fragment>
            <button className="btn btn-sm btn-secondary" data-click="useTime" data-index={index}>
                <i className="fas fa-cogs"></i>
            </button>
            <button className="btn btn-sm btn-secondary" data-click="editTime" data-index={index}>
                <i className="far fa-edit"></i>
            </button>
            <button className="btn btn-sm btn-secondary" data-click="delete" data-index={index}>
                <i className="far fa-trash-alt"></i>
            </button>
        </React.Fragment>
    );

};

export const RenderTimeTableUsed = (functionaryKey) => {

    return $("#used").DataTable({
        "language": { ...dataTableSpanish },
        "ajax"    : function (data, callback, settings) {
            callback(ajaxEmploy(functionaryKey).used());
        },
        "columnDefs": [
            {
                targets: [0],
                render : (item) => {
                    const [index, data, dateOrder] = item.split("|");

                    return renderToString(
                        <OpenDetails
                            index={index}
                            data={data}
                            dateOrder={dateOrder}
                        />
                    );
                }
            }
        ]
    });
};

export const RenderTimeTableNotUsed = (functionaryKey) => {

    return $("#notUsed").DataTable({
        "language": { ...dataTableSpanish },
        "ajax"    : function (data, callback, settings) {
            callback(ajaxEmploy(functionaryKey).notUsed());
        },
        "columnDefs": [
            {
                targets: [0],
                render : (item) => {
                    const [index, data, dateOrder] = item.split("|");

                    return renderToString(
                        <OpenDetails
                            index={index}
                            data={data}
                            dateOrder={dateOrder}
                        />
                    );
                }
            },
            {
                targets: [1],
                render : (item, t, g, h,) => {
                    const { humanize, brute } = item;

                    return renderToString(
                        <ColumnsCustomOrder
                            humanize={humanize}
                            brute={brute}
                        />
                    );
                }
            },
            {
                targets: [2],
                render : (item, t, g, h,) => {
                    const { humanize, brute } = item;

                    return renderToString(
                        <ColumnsCustomOrder
                            humanize={humanize}
                            brute={brute}
                        />
                    );
                }
            },

            {
                targets: [6],
                render : (index) => {
                    return renderToString(
                        <ActionTableButton
                            index={index}
                        />
                    );
                }
            }
        ]
    });
};