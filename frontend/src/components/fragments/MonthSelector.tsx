import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { HeaderTimeContextSchema } from "src/utils/interfaces";
import { HeaderTimeContext } from "../../context/index";

interface MonthSelectorState {
    number: number;
    name: string
}

const MonthSelector = () => {

    const { monthSelected, setMonthSelected } = useContext<Partial<HeaderTimeContextSchema>>(HeaderTimeContext);


    const [monthCollection, setMonthCollection] = useState<Array<MonthSelectorState>>();

    useEffect(() => {

        const date = new Date();
        const collection: Array<MonthSelectorState> = [];

        for (let i = 0; i < 12; i++) {

            date.setMonth(i);

            collection?.push({
                name: date.toLocaleDateString([], {
                    month: "long"
                }),
                number: i,
            });
        }

        setMonthCollection(collection);

    }, []);


    const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (setMonthSelected) {
            setMonthSelected(Number.parseInt(e.target.value));
        }
    };

    return (
        <div className="row">
            <div className="col-3">
                <select
                    value={monthSelected}
                    className="form-control-sm form-control "
                    onChange={handleMonthChange}
                >
                    <option value={12}>Todo</option>
                    {
                        monthCollection?.map((month, index) => {
                            return (
                                <option
                                    key={index}
                                    value={month.number}
                                >
                                    {`${month.name.charAt(0).toUpperCase()}${month.name.substring(1)}`}
                                </option>
                            );
                        })
                    }
                </select>
            </div>
        </div>
    );
};

export default MonthSelector;