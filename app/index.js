const { dialog, app, ipcMain, } = require('electron');
const { addEmployWindow } = require('./frames/add_employ/addEmployWindow');
const { editEmployWindow } = require('./frames/edit_employ/editEmployWindow');
const { mainWindow } = require('./frames/main/mainWindow');
const { editEmployTime, useEmployTime, addEmployTime } = require('./frames/time');


function createWindow() {

    let childWindow;

    let win = mainWindow();

    ipcMain.on("load-backup-fail", () => {
        dialog.showMessageBox(win, { message: "no se pudo cargar la copia de seguridad" });
    });

    ipcMain.on("add-employ", (event, message) => {
        switch (message) {
            case "open":
                childWindow = addEmployWindow(win);
                break;
            case "close":
                childWindow.close();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table", []);
                childWindow.close();
                break;
            default:
                break;
        }
    });

    ipcMain.on("edit-employ", (event, message) => {

        const [command, id] = message;

        switch (command) {
            case "open":
                childWindow = editEmployWindow(win, id);
                break;
            case "close":
                childWindow.close();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table", []);
                childWindow.close();
                break;
            default:
                break;
        }
    });

    ipcMain.on("add-time", (event, message) => {
        const [command, id] = message;
        switch (command) {
            case "open":
                childWindow = addEmployTime(win, id);
                break;
            case "close":
                childWindow.close();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table-not-use", []);
                childWindow.close();
                break;

            default:
                break;
        }
    });
    
    ipcMain.on("edit-time", (event, message) => {
        const { command, employeeKey, id } = message;
        switch (command) {
            case "open":
                childWindow = editEmployTime(win, id, employeeKey);
                break;
            case "close":
                childWindow.close();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table-not-use", []);
                childWindow.close();
                break;

            default:
                break;
        }
    });

    ipcMain.on("use-time", (event, message) => {
        const { command, employeeKey, id } = message;
        switch (command) {
            case "open":
                childWindow = useEmployTime(win, id, employeeKey);
                break;
            case "close":
                childWindow.close();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table-not-use", []);
                win.webContents.send("refresh-table-use", []);
                childWindow.close();
                break;

            default:
                break;
        }
    });
}

app.whenReady().then(createWindow);
