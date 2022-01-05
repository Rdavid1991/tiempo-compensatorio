const path = require('path');
const { BrowserWindow } = require("electron");

exports.addEmployTime = (parent) => {
    const window = new BrowserWindow({
        width         : 500,
        height        : 400,
        minWidth      : 500,
        minHeight     : 400,
        maxWidth      : 500,
        maxHeight     : 400,
        webPreferences: {
            preload         : path.join(__dirname, "../../preload/preload.js"),
            contextIsolation: false,
        },
        parent: parent,
        modal : true,
        show  : false,
        frame : false
    });

    window.on("close", (e) => {
        e.preventDefault();
        window.hide();
    });

    return window;
};
