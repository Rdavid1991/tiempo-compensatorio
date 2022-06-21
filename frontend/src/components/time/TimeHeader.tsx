import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import TimeAddTime from "./TimeAddTime";
import MonthSelector from "../fragments/MonthSelector";
import UseToTotal from "../fragments/UseToTotal";
import { modalShow } from "src/utils/functions/actionModal";
import { HeaderTimeContext } from "src/context";


const TimeHeader = () => {

    const { data } = useContext(HeaderTimeContext);

    return (
        <div>

            <div className="row">
                <div className="col-5">
                    <div className="card h-100" title="title">
                        <div className="card-body">
                            <div className="row">
                                <h2>Funcionario: {data?.name}</h2>
                                <div className="row">
                                    <div className="col-3">
                                        <Link
                                            to="/"
                                            className="btn btn-sm btn-primary"
                                        >
                                            <i className="fas fa-arrow-left"></i>
                                            Atrás
                                        </Link>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            className="btn btn-sm btn-success mx-3"
                                            onClick={() => {
                                                modalShow("#functionaryAddTime");
                                            }}
                                        >
                                            <i className="fas fa-plus"></i>
                                            Agregar hora
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100" title="filter">
                        <div className="card-body">
                            <MonthSelector />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <UseToTotal />
                </div>
            </div>

            <TimeAddTime />

        </div>
    );
};

export default TimeHeader;