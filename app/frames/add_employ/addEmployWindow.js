const path = require('path');
const { BrowserWindow } = require("electron");

exports.addEmployWindow = (parent) => {
    const window = new BrowserWindow({
        width         : 500,
        height        : 568,
        minWidth      : 500,
        minHeight     : 568,
        maxWidth      : 500,
        maxHeight     : 568,
        webPreferences: {
            preload         : path.join(__dirname, "../../preload/preload.js"),
            contextIsolation: false,
        },
        parent: parent,
        modal : true,
        show  : false,
        frame : false
    });    
    window.loadURL("file:///" + path.join(__dirname, '/../../../build/index.html') + "#/add_employ");

    window.on("close", (e) => {
        e.preventDefault();
        window.hide();
    });
    
    return window;
};
