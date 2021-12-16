const randomId = () => {
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    let ranId = "";
    for (let i = 0; i < 6; i++) {
        ranId += str.charAt(Math.floor(Math.random() * str.length));
    }
    return ranId;
}

export {
    randomId
}