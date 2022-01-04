
const { dialog, app, ipcMain, } = require('electron');
const { addEmployWindow } = require('./app/addEmployWindow');
const { mainWindow } = require('./app/mainWindow');


function createWindow() {

    let win = mainWindow();
    

    ipcMain.on("load-backup-fail", () => {
        dialog.showMessageBox(win, { message: "no se pudo cargar la copia de seguridad" });
    });

    ipcMain.on("add-employ", (event, message) => {
        if (message === "open") {
            let winAddEmploy = addEmployWindow(win);
            winAddEmploy.show();
        }
    });


    ipcMain.on("save-data" , (event, data) => {
       console.log(data);
    });
}

app.whenReady().then(createWindow);
