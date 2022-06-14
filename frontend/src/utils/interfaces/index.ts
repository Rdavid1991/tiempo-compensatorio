import { Dispatch, SetStateAction } from "react";
import { UseTime } from "../../components/time/UseTime";

export interface UsedHistorySchema {
    date : string;
    hours: string;
}

export interface FunctionarySchema {
    day        : string,
    department : string,
    end        : string,
    hourLeft   : string,
    hourTotal  : number,
    hourUsed   : number,
    name       : string,
    start      : string,
    used       : boolean
    usedHourHistory: Array<UsedHistorySchema>
    time:Array<Partial<Omit<FunctionarySchema, "name" | "department" |"time">>>
}

export interface TimeTableStateSchema {
    notUsed : DataTables.DataTables;
    used : DataTables.DataTables;
}

export type FunctionaryAddFormSchema = Omit<FunctionarySchema, "time" | "usedHourHistory"> 
export type FunctionaryEditFormSchema = Pick<FunctionarySchema, "name" | "department"> 
export type FunctionarySourceSchema = Pick<FunctionarySchema, "name" | "department"| "time">

export type TimeEditSchema = Pick<FunctionarySchema, "day" | "start"| "end">

export interface AjaxData {
    data: Array<Array<string | number | { 
        brute: number; 
        humanize: string; 
    }>>
}

export interface UseTimeSchema {
    dateOfUse : string;
    hourToUse : string;
}

export interface HeaderTimeContextSchema {
    employeeKey: string;
    monthSelected: number;
    setMonthSelected : Dispatch<SetStateAction<number>>
}