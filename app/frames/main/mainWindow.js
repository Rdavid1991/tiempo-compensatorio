
const {menuTemplate} = require('./menuTemplate');
const path = require('path');
const { BrowserWindow, Menu, screen, ipcMain, dialog } = require("electron");
const fs = require('fs');

exports.mainWindow = () => {

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    const window = new BrowserWindow({
        minWidth      : (width * 0.8),
        minHeight     : (height * 0.8),
        width         : (width * 0.8),
        height        : (height * 0.8),
        show          : false,
        webPreferences: {
            preload         : path.join(__dirname, "../../preload/preload.js"),
            contextIsolation: false,
        },
    });

    window.loadFile(path.join(__dirname, '/../../../build/index.html'));
    
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(window)));
    mainEvents(window);

    window.on("ready-to-show",() => {
        window.show();
    });

    return window;
};

const mainEvents = (win) => {
    ipcMain.on("export", (event, data) => {
    
        dialog.showSaveDialog(win, { filters: [{ name: 'TIEMPO COMPENSATORIO', extensions: ['json'] }] }).then((fileName) => {
    
            if (!fileName.canceled) {
                fs.writeFile(fileName.filePath, data, function (err) {
                    if (err) {
                        event.reply("response", "Ha ocurrido un error creando el archivo: " + err.message);
                    }
                    event.reply("response_resolve", "El archivo ha sido creado satisfactoriamente");

                });
            }
        });
    });
};
