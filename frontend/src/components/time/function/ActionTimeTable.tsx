
import React from "react";
import { renderToString } from "react-dom/server";
import { ajaxEmploy } from "./ajaxEmploy";
import { dataTableSpanish } from "src/helper";
import { AjaxData } from "src/interfaces";


interface PropsOpenDetails {
    index : string;
    data : string;
    dateOrder : string;
}

const OpenDetails = ({ index, data, dateOrder } : PropsOpenDetails) => {
    return (
        <>
            <div style={{ cursor: "pointer" }} data-click="details" data-index={index}>
                <span className="d-none">{dateOrder}</span>
                {data}
            </div>
        </>
    );
};

interface PropsColumnCustomOrder {
    humanize: string;
    brute : string;
}
const ColumnsCustomOrder = ({ humanize, brute } :PropsColumnCustomOrder) => {
    return (
        <><span className="d-none">{brute}</span>{humanize}</>
    );
};


const ActionTableButton = ({ index } :{index : number}) => {
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

export const RenderTimeTableUsed = (functionaryKey : string) => {

    return $("#used").DataTable({
        
        "ajax": function (data, callback) {
            callback(ajaxEmploy(functionaryKey).used());
        },
        "columnDefs": [
            {
                render: (item : string) => {
                    const [index, data, dateOrder] = item.split("|");
                    return renderToString(<OpenDetails {...{ data, dateOrder, index}}/>);
                },
                targets: [0],
            }
        ],
        "language": { ...dataTableSpanish },
    });
};

export const RenderTimeTableNotUsed = (functionaryKey : string) => {

    return $("#notUsed").DataTable({
        ajax: (data, callback) => {
            callback(ajaxEmploy(functionaryKey).notUsed());
        },
        
        "columnDefs": [
            {
               
                render: (item: string) => {
                    const [index, data, dateOrder] = item.split("|");
                    return renderToString(<OpenDetails {...{data,dateOrder,index}}/>);
                },
                targets: [0],
            },
            {
                
                render: (item) => {
                    const { humanize, brute } = item;

                    return renderToString(
                        <ColumnsCustomOrder {...{brute,humanize}}/>
                    );
                },
                targets: [1],
            },
            {
                render: (item) => {
                    const { humanize, brute } = item;
                    return renderToString(<ColumnsCustomOrder {...{brute,humanize}}/>);
                },
                targets: [2],
            },

            {
                render: (index : number) => {    
                    return renderToString(<ActionTableButton {...{index}}/>);
                },
                targets: [6],
            }
        ],
        "language": { ...dataTableSpanish },
    });
};