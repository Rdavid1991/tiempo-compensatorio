import { createContext } from "react";
import { HeaderTimeContextSchema } from "src/utils/interfaces";

export const HeaderTimeContext = createContext<Partial<HeaderTimeContextSchema>>({
    data        : undefined,
    employeeKey : undefined,
    filter      : undefined,
    reloadData  : undefined,
    setFilter   : undefined,
    timeTable   : undefined,
});