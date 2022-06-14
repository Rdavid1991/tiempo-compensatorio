import { createContext } from "react";
import { HeaderTimeContextSchema } from "src/utils/interfaces";

export const HeaderTimeContext = createContext<Partial<HeaderTimeContextSchema>>({
    employeeKey      : undefined,
    monthSelected    : undefined,
    setMonthSelected : undefined
});