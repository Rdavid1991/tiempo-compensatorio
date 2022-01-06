const { BrowserWindow } = require('electron');
const path = require('path');

const timeFrame = {

    baseUrl    : "file:///" + path.join(__dirname, "/../../../build/index.html"),
    browserConf: (parent) => {
        return {
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
        };
    },
    windowEvent: (window) => {
        window.on("close", () => {
            window = null;
        });

        window.on("ready-to-show", () => {
            window.show();
        });
    },

    editEmployTime: (parent, id, employeeKey,) => {
        let window = new BrowserWindow({
            width    : 500,
            height   : 400,
            resizable: false,
            ...timeFrame.browserConf(parent)
        });

        timeFrame.windowEvent(window);
        window.loadURL(timeFrame.baseUrl + "#/edit_time/" + employeeKey + "/" + id);
        return window;
    },

    useEmployTime: (parent, id, employeeKey,) => {
        let window = new BrowserWindow({
            width    : 500,
            height   : 320,
            resizable: false,
            ...timeFrame.browserConf(parent)
        });

        timeFrame.windowEvent(window);
        window.loadURL(timeFrame.baseUrl + "#/use_time/" + employeeKey + "/" + id);
        return window;
    }

};

module.exports = timeFrame;
