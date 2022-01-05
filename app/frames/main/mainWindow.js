
const {menuTemplate} = require('./menuTemplate');
const path = require('path');
const { BrowserWindow, Menu, screen } = require("electron");

exports.mainWindow = () => {

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    const window = new BrowserWindow({
        minWidth      : (width * 0.8),
        minHeight     : (height * 0.8),
        width         : (width * 0.8),
        height        : (height * 0.8),
        vibrancy      : 'ultra-dark',
        webPreferences: {
            preload         : path.join(__dirname, "../../preload/preload.js"),
            contextIsolation: false,
        },
    });

    window.loadFile(path.join(__dirname, '/../../../build/index.html'));
    
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(window)));

    return window;
};
