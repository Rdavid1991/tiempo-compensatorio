import React from "react";
import PropTypes from "prop-types";

const TimeTableUsed = props => {
    return (
        <table id="used" className="table table-sm table-striped" style={{ width: "100%" }} aria-describedby="example_info">
            <thead>
                <tr>
                    <th>Dia</th>
                    <th>Desde</th>
                    <th>Hasta</th>
                    <th>Tiempo total</th>
                    <th>Tiempo usado</th>
                    <th>Tiempo restante</th>
                </tr>
            </thead>
        </table>
    );
};

TimeTableUsed.propTypes = {};

export default React.memo(TimeTableUsed);