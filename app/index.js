const path = require('path');
const { dialog, app, ipcMain, } = require('electron');
const { addEmployWindow } = require('./frames/add_employ/addEmployWindow');
const { addEmployTime } = require('./frames/add_time/addEmployTime');
const { editEmployWindow } = require('./frames/edit_employ/editEmployWindow');
const { mainWindow } = require('./frames/main/mainWindow');


function createWindow() {

    let win = mainWindow();
    let winAddEmploy = addEmployWindow(win);
    let winEditEmploy = editEmployWindow(win);
    let winAddEmployTime = addEmployTime(win);

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
                win.webContents.send("refresh-table", []);
                winAddEmploy.hide();
                break;
        
            default:
                break;
        }
    });

    ipcMain.on("edit-employ", (event, message) => {

        const [command, id] = message;

        switch (command) {
            case "open":
                winEditEmploy.webContents.send("verify-theme", []);
                winEditEmploy.loadURL(winEditEmploy.webContents.getURL().replace(/(?<=edit_employ\/)(.*)/, id));
                winEditEmploy.show();
                break;
            case "close":
                winEditEmploy.hide();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table", []);
                winEditEmploy.hide();
                break;
        
            default:
                break;
        }
    });

    ipcMain.on("add-time", (event, message) => {

        const [command, id] = message;

        switch (command) {
            case "open":
                console.log("file:///" + path.join(__dirname, "/../../../build/index.html") + "#/add_time/" + id);
                winAddEmployTime.loadURL("file:///" + path.join(__dirname, "/../build/index.html") + "#/add_time/" + id);
                winAddEmployTime.webContents.send("verify-theme", []);
                winAddEmployTime.show();
                break;
            case "close":
                winEditEmploy.hide();
                break;
            case "refresh-table":
                win.webContents.send("refresh-table", []);
                winEditEmploy.hide();
                break;
        
            default:
                break;
        }
    });
}

app.whenReady().then(createWindow);
