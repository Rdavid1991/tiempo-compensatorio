const { dialog, app, ipcMain, } = require('electron');
const { addEmployWindow } = require('./frames/add_employ/addEmployWindow');
const { addEmployTime } = require('./frames/add_time/addEmployTime');
const { editEmployWindow } = require('./frames/edit_employ/editEmployWindow');
const { mainWindow } = require('./frames/main/mainWindow');


function createWindow() {
    
    let winAddEmploy, winEditEmploy, winAddEmployTime;
    
    let win = mainWindow();

    ipcMain.on("load-backup-fail", () => {
        dialog.showMessageBox(win, { message: "no se pudo cargar la copia de seguridad" });
    });

    ipcMain.on("add-employ", (event, message) => {
        switch (message) {
            case "open":
                winAddEmploy = addEmployWindow(win);
                break;
            case "close":
                winAddEmploy.close();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table", []);
                winAddEmploy.close();
                break;
            default:
                break;
        }
    });

    ipcMain.on("edit-employ", (event, message) => {

        const [command, id] = message;

        switch (command) {
            case "open":
                winEditEmploy = editEmployWindow(win, id);
                break;
            case "close":
                winEditEmploy.close();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table", []);
                winEditEmploy.close();
                break;
            default:
                break;
        }
    });

    ipcMain.on("add-time", (event, message) => {
        const [command, id] = message;
        switch (command) {
            case "open":
                winAddEmployTime = addEmployTime(win, id);
                break;
            case "close":
                winAddEmployTime.close();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table-not-use", []);
                winAddEmployTime.close();
                break;
        
            default:
                break;
        }
    });
}

app.whenReady().then(createWindow);
