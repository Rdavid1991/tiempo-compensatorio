import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { HeaderTimeContext } from "src/context";
import { timeToHumanize, timeToString } from "src/helper";
import db from "src/helper/db";
import { FunctionarySourceSchema, UseTimeSchema } from "src/utils/interfaces";

const UseToTotal = () => {

    const { employeeKey } = useContext(HeaderTimeContext);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        const data = db().getOneEmploy(employeeKey as string) as FunctionarySourceSchema;

        let totalInMilliseconds = 0;

        data.time.map((item) => {
            totalInMilliseconds += moment.duration(item.hourLeft, "hours").asMilliseconds();
        });

        setTotal(totalInMilliseconds);

    }, []);

    const useFromTotalTime = () => {
        const horas = 4;
        const strTimeToUse = timeToString(String(horas));
        let timeToUse: number;
        let timeLeft: number;

        const data = db().getOneEmploy(employeeKey as string) as FunctionarySourceSchema;


        for (let i = 0; i < data.time.length; i++) {

            const strTimeLeft = timeToString(data.time[i].hourLeft as string);
            debugger;
            timeLeft = moment.duration(strTimeLeft).asMilliseconds();
            timeToUse = moment.duration(strTimeToUse).asMilliseconds();

            const resultLeft = timeLeft - timeToUse;
            timeToUse = timeToUse - resultLeft;



            if (resultLeft <= 0) {
                data.time[i].hourLeft = "0";
                data.time[i].used = true;
            } else {
                data.time[i].hourLeft = moment.utc(resultLeft).format("H:mm");
                break;
            }


            if (timeToUse <= 0) {
                break;
            }
        }

        console.log(data);
        debugger;

        localStorage.setItem(employeeKey as string,JSON.stringify(data));

    };

    return (
        <>
            <div>{timeToHumanize(total)}</div>
            <button type="button"
                onClick={useFromTotalTime}
            >Usar</button>
        </>
    );
};

export default React.memo(UseToTotal);