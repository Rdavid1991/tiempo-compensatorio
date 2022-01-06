const path = require('path');
const { BrowserWindow } = require("electron");

exports.editEmployWindow = (parent, id) => {
    let window = new BrowserWindow({
        width         : 500,
        height        : 345,
        resizable     : false,
        webPreferences: {
            preload         : path.join(__dirname, "../../preload/preload.js"),
            contextIsolation: false,
        },
        center: true,
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
    
    window.loadURL("file:///" + path.join(__dirname, "/../../../build/index.html") + "#/edit_employ/" + id);
    return window;
};
