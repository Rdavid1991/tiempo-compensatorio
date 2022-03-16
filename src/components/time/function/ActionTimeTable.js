/* global $ */
import React from "react";
import { renderToString } from "react-dom/server";
import { ajaxEmploy } from "./ajaxEmploy";
import { dataTableSpanish } from "src/helper";


const OpenDetails = ({ index, data, dateOrder }) => {
    return (
        <div style={{ cursor: "pointer" }} data-click="details" data-index={index}>
            <span className="d-none">{dateOrder}</span>
            {data}
        </div>
    );
};

const ActionTableButton = ({ index }) => {
    return (
        <>
            <button className="btn btn-sm btn-secondary" data-click="useTime" data-index={index}>
                <i className="fas fa-cogs"></i>
            </button>
            <button className="btn btn-sm btn-secondary" data-click="editTime" data-index={index}>
                <i className="far fa-edit"></i>
            </button>
            <button className="btn btn-sm btn-secondary" data-click="delete" data-index={index}>
                <i className="far fa-trash-alt"></i>
            </button>
        </>
    );

};

export const RenderTimeTableUsed = (functionaryKey) => {

    return $("#used").DataTable({
        "language"  : { ...dataTableSpanish },
        "aaData"    : ajaxEmploy(functionaryKey).used().data,
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
        "language"  : { ...dataTableSpanish },
        "aaData"    : ajaxEmploy(functionaryKey).notUsed().data,
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



export const RefreshNotUsedTable = (employeeKey, table) => {
    console.log({ employeeKey, table });
    table.clear().rows.add(ajaxEmploy(employeeKey).notUsed().data).draw();
    table.columns.adjust().draw();
};

export const RefreshUsedTable = (employeeKey, table) => {
    table.clear().rows.add(ajaxEmploy(employeeKey).used().data).draw();
    table.columns.adjust().draw();
};

