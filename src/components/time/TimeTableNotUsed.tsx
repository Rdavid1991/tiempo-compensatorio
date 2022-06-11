import React from "react";
import PropTypes from "prop-types";

const TimeTableNotUsed = props => {
    return (
        <table id="notUsed" className="table table-sm table-striped" style={{ width: "100%" }} aria-describedby="example_info">
            <thead>
                <tr>
                    <th id="day">Dia</th>
                    <th>Desde</th>
                    <th>Hasta</th>
                    <th>Tiempo total</th>
                    <th>Tiempo usado</th>
                    <th>Tiempo restante</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        </table>
    );
};

TimeTableNotUsed.propTypes = {};

export default React.memo(TimeTableNotUsed);