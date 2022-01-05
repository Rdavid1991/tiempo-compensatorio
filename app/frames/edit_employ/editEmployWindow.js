const path = require('path');
const { BrowserWindow } = require("electron");

exports.editEmployWindow = (parent) => {
    const window = new BrowserWindow({
        width         : 500,
        height        : 345,
        minWidth      : 500,
        minHeight     : 345,
        maxWidth      : 500,
        maxHeight     : 345,
        webPreferences: {
            preload         : path.join(__dirname, "../../preload/preload.js"),
            contextIsolation: false,
        },
        parent: parent,
        modal : true,
        show  : false,
        frame : false
    });
    window.loadURL("file:///" + path.join(__dirname, "/../../../build/index.html") + "#/edit_employ/");
    window.reload();

    window.on("close", (e) => {
        e.preventDefault();
        window.hide();
    });

    return window;
};
