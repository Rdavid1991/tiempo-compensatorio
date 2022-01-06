const path = require('path');
const { BrowserWindow } = require("electron");

exports.addEmployWindow = (parent) => {
    let window = new BrowserWindow({
        width         : 500,
        height        : 568,
        maximizable   : false,
        resizable     : false,
        parent        : parent,
        modal         : true,
        show          : false,
        frame         : false,
        webPreferences: {
            preload         : path.join(__dirname, "../../preload/preload.js"),
            contextIsolation: false,
        }
    });

    window.on("ready-to-show",() => {
        window.show();
    });

    window.on("close", () => {
        window = null;
    });

    window.loadURL("file:///" + path.join(__dirname, '/../../../build/index.html') + "#/add_employ");
    return window;
};
