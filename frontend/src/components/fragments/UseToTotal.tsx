import moment from "moment";
import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { HeaderTimeContext } from "src/context";
import { timeToHumanize, timeToString } from "src/helper";
import db from "src/helper/db";
import { FunctionarySourceSchema } from "src/utils/interfaces";
import { modalShow } from "src/utils/Modal";
import { UsedHistorySchema } from "../../utils/interfaces/index";
import { useForm } from "../../hooks/useForm";
import { errorAlert, successAlert } from "../../utils/Alerts";
import { modalHide } from "../../utils/Modal";


interface UseTotalStateSchema {
    timeToUse: string;
    dateOfUse: string;
}


const UseToTotal = () => {
    const useTotalTimeModal = useRef("useTotalTime").current;

    const { values, handleInputChange } = useForm<UseTotalStateSchema>({
        dateOfUse : "",
        timeToUse : ""
    });

    const { employeeKey, timeTable } = useContext(HeaderTimeContext);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        const data = db().getOneEmploy(employeeKey as string) as FunctionarySourceSchema;
        let totalInMilliseconds = 0;
        data.time.map((item) => {
            totalInMilliseconds += moment.duration(item.hourLeft, "hours").asMilliseconds();
        });
        setTotal(totalInMilliseconds);
    }, []);

    const useFromTotalTime = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const strTimeToUse = timeToString(values.timeToUse);
        let timeToUse: number = moment.duration(strTimeToUse).asMilliseconds();
        let timeLeft: number;
        let resultLeft: number;

        if (timeToUse > total) {
            errorAlert("No cuenta con suficiente tiempo para usar");
            return;
        }

        const data = db().getOneEmploy(employeeKey as string) as FunctionarySourceSchema;

        for (let i = 0; i < data.time.length; i++) {

            if (!data.time[i].used) {

                const strTimeLeft = timeToString(data.time[i].hourLeft as string);

                timeLeft = moment.duration(strTimeLeft).asMilliseconds();

                resultLeft = timeLeft - timeToUse;
                timeToUse = resultLeft <= 0 ? timeToUse + resultLeft : timeToUse - resultLeft;

                if (resultLeft <= 0) {

                    (data.time[i].usedHourHistory as Array<UsedHistorySchema>).push({
                        "date"  : values.dateOfUse,
                        "hours" : data.time[i].hourLeft as string
                    });

                    data.time[i].hourLeft = "0";
                    data.time[i].used = true;

                    if (resultLeft === 0) break;
                } else {
                    (data.time[i].usedHourHistory as Array<UsedHistorySchema>).push({
                        "date"  : values.dateOfUse,
                        "hours" : timeToString((timeLeft - resultLeft).toString())
                    });

                    data.time[i].hourLeft = moment.utc(resultLeft).format("H:mm");

                    break;
                }
            }


        }
        localStorage.setItem(employeeKey as string, JSON.stringify(data));

        modalHide(`#${useTotalTimeModal}`);
        successAlert("Tiempo usado");

        timeTable?.notUsed.ajax.reload();
        timeTable?.used.ajax.reload();
        
    };

    const openModalUseTotalTime = () => {
        modalShow(`#${useTotalTimeModal}`);
    };

    return (
        <>
            <div className="card w-100">
                <div className="card-body">

                    <div className="row">
                        <h4>Total de horas restantes</h4>
                    </div>
                    <div className="row d-flex">
                        <div className="col">
                            <h5>{timeToHumanize(total)}</h5>
                        </div>

                        <div className="col">
                            <button
                                className="btn btn-sm"
                                type="button"
                                onClick={openModalUseTotalTime}
                            >
                                Usar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id={useTotalTimeModal}
                data-bs-backdrop="static"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Usar tiempo del total - {timeToHumanize(total)}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form
                            onSubmit={useFromTotalTime}
                        >
                            <div className="modal-body">

                                <div className="mb-3">
                                    <label
                                        htmlFor="timeToUse"
                                        className="form-label"
                                    >
                                        Horas a usar
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        id="timeToUse"
                                        onChange={handleInputChange}
                                        value={values.timeToUse}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="dateOfUse"
                                        className="form-label"
                                    >
                                        Fecha de uso
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control form-control-sm"
                                        id="dateOfUse"
                                        onChange={handleInputChange}
                                        value={values.dateOfUse}
                                    />
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary"
                                >
                                    Usar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(UseToTotal);