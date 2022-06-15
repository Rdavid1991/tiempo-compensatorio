import { createContext } from "react";
import { HeaderTimeContextSchema } from "src/utils/interfaces";

export const HeaderTimeContext = createContext<Partial<HeaderTimeContextSchema>>({
    employeeKey : undefined,
    filter      : undefined,
    setFilter   : undefined,
    timeTable   : undefined
});