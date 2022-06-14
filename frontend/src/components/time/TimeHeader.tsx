import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAddTime from "./TimeAddTime";
import { TimeTableStateSchema } from "../../utils/interfaces/index";
import MonthSelector from "../fragments/MonthSelector";
import UseToTotal from "../fragments/UseToTotal";

interface PropsTimeHeader {
    name: string;
    timeTable: TimeTableStateSchema;
}

const TimeHeader = ({ name, timeTable }: PropsTimeHeader) => {

    return (
        <div>
            <div className="row">
                <h2>Funcionario: {name}</h2>
            </div>
            <div className="row">
                <div className="col-1">
                    <Link
                        to="/"
                        className="btn btn-sm btn-primary"
                    >
                        <i className="fas fa-arrow-left"></i>
                        Atrás
                    </Link>
                </div>
                <div className="col-2">
                    <button
                        className="btn btn-sm btn-success mx-3"
                        data-bs-toggle="modal"
                        data-bs-target="#functionaryAddTime"
                    >
                        <i className="fas fa-plus"></i>
                        Agregar hora
                    </button>

                </div>
                <div className="col">
                    <MonthSelector />
                </div>
                <div className="col">
                    <UseToTotal />
                </div>
            </div>

            <TimeAddTime {...{ timeTable }} />

        </div>
    );
};

export default React.memo(TimeHeader);