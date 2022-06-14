
import { menuTemplate } from "./menuTemplate";
import path = require("path");
import { BrowserWindow, Menu, screen, ipcMain, dialog } from "electron";
import fs = require("fs");
import { autoUpdater } from "electron-updater";

export const Main = () => {

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    const window = new BrowserWindow({
        height         : (height * 0.8),
        minHeight      : (height * 0.8),
        minWidth       : (width * 0.8),
        show           : false,
        webPreferences : {
            contextIsolation : false,
            preload          : path.join(__dirname, "/preload.js"),
            webgl            : false
        },
        width: (width * 0.8),
    });

    const ruta =window.webContents.session.storagePath;
    console.log("🚀 ~ file: main.ts ~ line 27 ~ Main ~ ruta", ruta);

    

    if (process.env.ELECTRON_ENV === "DEV") {
        window.loadURL("http://localhost:3000");
    } else {
        window.loadFile(path.join(__dirname, "/../../views/index.html"));
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(window)));
    mainEvents(window);

    window.once("ready-to-show", async () => {
        autoUpdater.checkForUpdatesAndNotify(/* "Hay una nueva version disponible, se instalara en el proximo reinicio" */);
        window.show();
    });

    return window;
};

const mainEvents = (win) => {
    ipcMain.on("export", (event, data) => {

        dialog.showSaveDialog(win, { filters: [{ name: "TIEMPO COMPENSATORIO", extensions: ["json"] }] }).then((fileName) => {

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
