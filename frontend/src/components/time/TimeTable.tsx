import React, { MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import moment from "moment";
import "moment/locale/es-us";
import TimeTableUsed from "./TimeTableUsed";
import TimeTableNotUsed from "./TimeTableNotUsed";
import TimeHeader from "./TimeHeader";
import { RenderTimeTableNotUsed, RenderTimeTableUsed } from "./function/ActionTimeTable";
import { modalShow } from "../../utils/Modal";
import { TimeTableStateSchema } from "src/utils/interfaces";
import TimeEditTime from "./TimeEditTime";
import { UseTime } from "./UseTime";
import { DetailsTime } from "./DetailsTime";
import MonthSelector from "../fragments/MonthSelector";
import { MonthContext } from "src/context";

moment.locale("es");

const initialTimeTableState: TimeTableStateSchema = {
    notUsed : $().DataTable(),
    used    : $().DataTable(),
};

export const TimeTable = () => {

    const { employeeKey } = useParams() as { employeeKey: string };

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth());
    const [timeTable, setTimeTable] = useState<TimeTableStateSchema>(initialTimeTableState);
    const [id, setId] = useState<number>(0);
    const [data, setData] = useState(JSON.parse(localStorage.getItem(employeeKey as string) as string));

    useEffect(() => {

        timeTable.notUsed.destroy(); 
        timeTable.used.destroy(); 

        setTimeTable({
            notUsed : RenderTimeTableNotUsed(employeeKey as string, monthSelected),
            used    : RenderTimeTableUsed(employeeKey as string, monthSelected),
        });

        $(".pagination").addClass("pagination-sm");
    }, [monthSelected]);

    // const handleDelete = async (target, index, key) => {

    //     const { isConfirmed } = await confirmAlert("¿Desea borrar el registro?");

    //     if (isConfirmed) {
    //         const isDeleted = await localDB.drop(target, index, key);
    //         if (isDeleted) {
    //             const tr = target.closest("tr");
    //             tr.classList.add("animate__animated", "animate__backOutLeft");
    //             onanimationend = async (e) => {
    //                 if (e.animationName === "backOutLeft" && Boolean(target.closest("#notUsed"))) {
    //                     await successAlert("El registro a sido borrado");
    //                     timeTable.notUsed.ajax.reload();
    //                 }
    //             };
    //         } else {
    //             errorAlert("No se pudo borrar el registro");
    //         }
    //     }

    // };

    const handleActionTable = (e: MouseEvent<HTMLDivElement>) => {

        const button = e.target as HTMLButtonElement;

        switch (button.dataset.click) {
        case "details":
            modalShow("#details");
            break;
        case "delete":
            // handleDelete(target, id, employeeKey);
            break;
        case "useTime":
            modalShow("#useTime");
            break;
        case "editTime":
            modalShow("#timeEditModal");
            break;
        default:
            break;
        }
        setId(Number.parseInt(button.dataset.index as string));
        const { notUsed, used } = timeTable;
        notUsed.ajax.reload();
        used.ajax.reload();
    };

    return (


        < div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }}>
            <UseTime {...{ employeeKey, id, timeTable }} />
            <TimeEditTime {...{ employeeKey, id }} />
            <MonthContext.Provider value={{
                monthSelected,
                setMonthSelected
            }}>
                <TimeHeader  {...{ name: data.name, timeTable }} />
            </MonthContext.Provider>
            <DetailsTime {...{ employeeKey, id }} />

            <div className="mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="btn-sm nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#NotUsedPane" type="button">Horas disponibles</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="btn-sm nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#usedPane" type="button">Horas usadas</button>
                    </li>
                </ul>
                <div className="tab-content mt-4" id="myTabContent" onClick={handleActionTable}>
                    <div className="tab-pane fade show active" id="NotUsedPane">
                        <TimeTableNotUsed />
                    </div>
                    <div className="tab-pane fade" id="usedPane" role="tabpanel">
                        <TimeTableUsed />
                    </div>
                </div>
            </div>
        </div >
    );
};

