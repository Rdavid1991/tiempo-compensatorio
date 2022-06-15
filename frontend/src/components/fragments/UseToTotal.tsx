import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { HeaderTimeContext } from "src/context";
import { timeToHumanize, timeToString } from "src/helper";
import db from "src/helper/db";
import { FunctionarySourceSchema, UseTimeSchema } from "src/utils/interfaces";
import { UsedHistorySchema } from "../../utils/interfaces/index";

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
        let timeToUse : number = moment.duration(strTimeToUse).asMilliseconds();
        let timeLeft: number;
        let resultLeft : number;

        if (timeToUse > total) {
            console.log("No tiene tiempo suficiente para usar");
            return;
        }

        const data = db().getOneEmploy(employeeKey as string) as FunctionarySourceSchema;
        
        for (let i = 0; i < data.time.length; i++) {

            if (!data.time[i].used) {
                
            
                const strTimeLeft = timeToString(data.time[i].hourLeft as string);
                debugger;
                timeLeft = moment.duration(strTimeLeft).asMilliseconds();
           

                resultLeft = timeLeft - timeToUse;
                timeToUse = resultLeft <= 0 ? timeToUse + resultLeft : timeToUse - resultLeft ;



                if (resultLeft <= 0) {
                    
                    (data.time[i].usedHourHistory as Array<UsedHistorySchema>  ).push({
                        "date"  : "2022-06-14",
                        "hours" : data.time[i].hourLeft as string
                    });

                    data.time[i].hourLeft = "0";
                    data.time[i].used = true;
                
                    if(resultLeft === 0) break;
                } else {
                    (data.time[i].usedHourHistory as Array<UsedHistorySchema>  ).push({
                        "date"  : "2022-06-14",
                        "hours" : timeToString((timeLeft - resultLeft).toString())
                    });

                    data.time[i].hourLeft = moment.utc(resultLeft).format("H:mm");

                
                    break;
                }
            }

                
        }

        console.log(data);

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