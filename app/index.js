
const { dialog, app, ipcMain, } = require('electron');
const { addEmployWindow } = require('./frames/add_employ/addEmployWindow');
const { mainWindow } = require('./frames/main/mainWindow');


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
            case "refresh-table":
                win.webContents.send("crate-employ", []);
                winAddEmploy.hide();
                break;
        
            default:
                break;
        }
    });
}

app.whenReady().then(createWindow);
