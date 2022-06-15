import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { HeaderTimeContextSchema } from "src/utils/interfaces";
import { HeaderTimeContext } from "../../context/index";

interface MonthSelectorState {
    number: number;
    name: string
}

const MonthSelector = () => {

    const { filter, setFilter} = useContext<Partial<HeaderTimeContextSchema>>(HeaderTimeContext);

    const [monthCollection, setMonthCollection] = useState<Array<MonthSelectorState>>();
    const [yearCollection, setYearCollection] = useState<Array<number>>();

    useEffect(() => {

        const date = new Date();
        const collection: Array<MonthSelectorState> = [];
        const collectionYear: Array<number> = [];

        for (let i = 0; i < 12; i++) {

            date.setMonth(i);

            collection?.push({
                name: date.toLocaleDateString([], {
                    month: "long"
                }),
                number: i,
            });
        }


        const forStartIndex = date.getFullYear() - 10;
        const forEndIndex = date.getFullYear();
        for (let i = forStartIndex; i <= forEndIndex; i++) {
            collectionYear.push(i);
        }

        setMonthCollection(collection);
        setYearCollection(collectionYear);

    }, []);


    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (setFilter && filter) {
            setFilter({
                ...filter,
                [e.target.name]: Number.parseInt(e.target.value)
            });
        }
    };


    return (

        <div className="row">

            <div className="col">
                <div className="row">
                    <h3>Filtro</h3>
                </div>
                <div className="row">
                    <div className="col">
                        <select
                            value={filter?.month}
                            className="form-select-sm form-select"
                            onChange={handleSelectChange}
                            name="month"
                        >
                            <option value={100}>Todo</option>
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
                    <div className="col">
                        <select
                            value={filter?.year}
                            className="form-select-sm form-select"
                            onChange={handleSelectChange}
                            name="year"
                        >
                            <option value={100}>Todo</option>
                            {
                                yearCollection?.map((year, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={year}
                                        >
                                            {year}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MonthSelector;