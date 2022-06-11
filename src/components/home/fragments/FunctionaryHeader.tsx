import React from "react";
import PropTypes from "prop-types";

const FunctionaryHeader = props => {
    return (
        <React.Fragment>
            <h1>Registro de tiempo compensatorio, Funciona</h1>
            <h2>Lista de funcionarios</h2>

            <button
                type="button"
                className="btn btn-sm btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addFunctionary"
            >
                <i className="fas fa-plus"></i>
                Nuevo funcionario
            </button>

        </React.Fragment>
    );
};

FunctionaryHeader.propTypes = {};

export default React.memo(FunctionaryHeader);