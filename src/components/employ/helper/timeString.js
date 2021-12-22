
export const timeToString = (time) => {

    let str = "";
    const arrayTime = time.toString().split(":")

    switch (arrayTime.length) {
        case 1:
            str = `${arrayTime[0]} ${(parseInt(arrayTime[0]) === 1)
                ? "hora"
                : "horas"}`
            break;
        case 2:
            str = `${arrayTime[0]} ${(parseInt(arrayTime[0]) === 1)
                ? "hora"
                : "horas"} ${arrayTime[1] === "00" ? "" : `y ${arrayTime[1]} minutos`}`
            break;
        default:
            break;
    }

    return str
}
