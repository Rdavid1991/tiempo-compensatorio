const path = require('path');
const { BrowserWindow } = require("electron");

exports.addEmployTime = (parent, id) => {
    let window = new BrowserWindow({
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

    window.on("close", () => {
        window = null;
    });
    
    window.on("ready-to-show",() => {
        window.show();
    });

    window.loadURL("file:///" + path.join(__dirname, "/../../../build/index.html") + "#/add_time/" + id);
    return window;
};
