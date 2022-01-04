const path = require('path');
const { BrowserWindow } = require("electron");

exports.addEmployWindow = (parent) => {
    const window = new BrowserWindow({
        width         : 500,
        height        : 568,
        webPreferences: {
            preload: path.join(__dirname, "script.js"),
        },
        parent: parent,
        modal : true,
        show  : false,
        frame : true
    });    
    window.loadURL("file:///" + path.join(__dirname, '/../build/index.html') + "#/add_employ");
    
    return window;
};
