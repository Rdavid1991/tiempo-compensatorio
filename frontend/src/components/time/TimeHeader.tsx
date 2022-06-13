import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAddTime from "./TimeAddTime";
import { TimeTableStateSchema } from "../../interfaces/index";

interface PropsTimeHeader{
     name : string; 
     timeTable : TimeTableStateSchema;
}

const TimeHeader = ( { name, timeTable } : PropsTimeHeader) => {

    return (
        <div>
            <h2>Funcionario: {name}</h2>
            <Link
                to="/"
                className="btn btn-sm btn-primary"
            >
                <i className="fas fa-arrow-left"></i>
                Atrás
            </Link>

            <button
                className="btn btn-sm btn-success mx-3"
                data-bs-toggle="modal"
                data-bs-target="#functionaryAddTime"
            >
                <i className="fas fa-plus"></i>
                Agregar hora
            </button>
            <TimeAddTime {...{timeTable}} />
        </div>
    );
};

export default React.memo(TimeHeader);