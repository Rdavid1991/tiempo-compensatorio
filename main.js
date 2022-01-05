
const { dialog, app, ipcMain, } = require('electron');
const { addEmployWindow } = require('./app/addEmployWindow');
const { mainWindow } = require('./app/mainWindow');


function createWindow() {

    let win = mainWindow();
    let winAddEmploy = addEmployWindow(win);

    ipcMain.on("load-backup-fail", () => {
        dialog.showMessageBox(win, { message: "no se pudo cargar la copia de seguridad" });
    });

    ipcMain.on("add-employ", (event, message) => {

        switch (message) {
            case "open":
                winAddEmploy.webContents.send("verify-theme", []);
                winAddEmploy.show();
                break;
            case "close":
                winAddEmploy.hide();
                break;
        
            default:
                break;
        }
    });

    ipcMain.on("refresh-table", () => {
        win.webContents.send("crate-employ", []);
        winAddEmploy.hide();
    });
}

app.whenReady().then(createWindow);
