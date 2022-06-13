import { createContext } from "react";
import { MontContextSchema } from "src/utils/interfaces";

export const MonthContext = createContext<Partial<MontContextSchema>>({
    monthSelected    : undefined,
    setMonthSelected : undefined
});