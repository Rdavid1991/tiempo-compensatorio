import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import moment from "moment";
import "moment/locale/es-us";
import TimeTableUsed from "./TimeTableUsed";
import TimeTableNotUsed from "./TimeTableNotUsed";
import TimeHeader from "./TimeHeader";
import { RenderTimeTableNotUsed, RenderTimeTableUsed } from "./function/ActionTimeTable";
import { modalShow } from "../../utils/functions/actionModal";
import { FilterStateSchema, FunctionarySourceSchema, TimeTableStateSchema } from "src/utils/interfaces";
import TimeEditTime from "./TimeEditTime";
import { UseTime } from "./UseTime";
import { DetailsTime } from "./DetailsTime";
import { HeaderTimeContext } from "src/context";
import { confirmAlert, errorAlert, successAlert } from "src/utils/functions/Alerts";
import db from "src/helper/db";

moment.locale("es");

const initialTimeTableState: TimeTableStateSchema = {
    notUsed : $().DataTable(),
    used    : $().DataTable(),
};

export const TimeTable = () => {

    const { employeeKey } = useParams() as { employeeKey: string };

    const timeTableData = (): FunctionarySourceSchema => JSON.parse(localStorage.getItem(employeeKey as string) as string);
    const initialDataState = useRef<FunctionarySourceSchema>(timeTableData()).current;


    const [filter, setFilter] = useState<FilterStateSchema>({
        month : 100, //100 para que se seleccione la opción todo
        year  : new Date().getFullYear()
    });

    const [timeTable, setTimeTable] = useState<TimeTableStateSchema>(initialTimeTableState);

    const [action, setAction] = useState<HTMLButtonElement>();

    const [data, setData] = useState<typeof initialDataState>(initialDataState);

    useEffect(() => {

        setTimeTable({
            notUsed : timeTable.notUsed.destroy(),
            used    : timeTable.used.destroy(),
        });

        setTimeTable({
            notUsed : RenderTimeTableNotUsed(employeeKey as string, filter),
            used    : RenderTimeTableUsed(employeeKey as string, filter),
        });

        $(".pagination").addClass("pagination-sm");
    }, [filter.month, filter.year]);

    useEffect(() => {

        switch (action?.dataset.click) {
            case "details":
                modalShow("#details");
                break;
            case "delete":
                handleDelete();
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
        const { notUsed, used } = timeTable;
        notUsed.ajax.reload();
        used.ajax.reload();

    }, [action]);



    const handleDelete = async () => {

        // Sobre escritura de interface de filas de tabla
        // _DT_RowIndex - Propiedad de data table
        interface HTMLDataTableRowElement extends HTMLTableRowElement {
            _DT_RowIndex: number
        }

        const { isConfirmed } = await confirmAlert("¿Desea borrar el registro?");

        if (isConfirmed) {
            const isDeleted = await db().drop(Number(action?.dataset.index), employeeKey);
            if (isDeleted) {

                //Obtener la posición de la fila a borrar
                const rowIndex = (action?.closest("tr") as HTMLDataTableRowElement | null)?._DT_RowIndex as number;

                const tr = document.querySelector(`#notUsed > tbody > :nth-child(${rowIndex + 1})`);
                if (tr) tr.classList.add("animate__animated", "animate__backOutLeft");

                onanimationend = async (e) => {

                    if (e.animationName === "backOutLeft" && (e.target as HTMLDataTableRowElement).closest("#notUsed")) {
                        await successAlert("El registro a sido borrado");
                        timeTable.notUsed.ajax.reload();
                        reloadData();
                    }
                };
            } else {
                errorAlert("No se pudo borrar el registro");
            }
        }
    };

    const handleActionTable = (e: MouseEvent<HTMLDivElement>) => {
        const button = e.target as HTMLButtonElement;
        setAction(button);
    };


    const reloadData = () => {
        setData(timeTableData());
        setAction(undefined);
    };

    return (

        < div className="animate__animated animate__bounce animate__fadeIn" style={{ animationFillMode: "backwards" }}>

            <HeaderTimeContext.Provider value={{
                data,
                employeeKey,
                filter,
                reloadData,
                setFilter,
                timeTable,
            }}>
                <TimeHeader />
                <UseTime {...{ employeeKey, id: Number(action?.dataset.index) | 0 }} />
                <TimeEditTime {...{ employeeKey, id: Number(action?.dataset.index) | 0 }} />
            </HeaderTimeContext.Provider>
            <DetailsTime {...{ employeeKey, id: Number(action?.dataset.index) | 0 }} />

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


