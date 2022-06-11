const { BrowserWindow } = require("electron");
const path = require("path");

const employFrame = {

    baseUrl    : "file:///" + path.join(__dirname, "/../../../build/index.html"),
    browserConf: (parent) => {

        return {
            resizable     : false,
            center        : true,
            parent        : parent,
            modal         : true,
            show          : false,
            frame         : false,
            maximizable   : false,
            webPreferences: {
                preload         : path.join(__dirname, "../../preload/preload.js"),
                contextIsolation: false,
                webgl           : false
            },
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

    addEmployWindow: (parent) => {
        let window = new BrowserWindow({
            width : 500,
            height: 568,
            ...employFrame.browserConf(parent)

        });

        employFrame.windowEvent(window);

        window.loadURL(employFrame.baseUrl + "#/add_employ");
        return window;
    },
    editEmployWindow: (parent, id) => {
        let window = new BrowserWindow({
            width : 500,
            height: 345,
            ...employFrame.browserConf(parent)
        });
        
        employFrame.windowEvent(window);
        
        window.loadURL(employFrame.baseUrl + "#/edit_employ/" + id);
        return window;
    }
};

module.exports = employFrame;
