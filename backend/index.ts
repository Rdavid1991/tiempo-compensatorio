import { dialog, app, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import { Main } from "./src/main";



try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // require("electron-reloader")(module);
} catch(e) {
    console.log(e);
}

function createWindow() {

    const win = Main();

    ipcMain.on("load-backup-fail", () => {
        dialog.showMessageBox(win, { message: "no se pudo cargar la copia de seguridad" });
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    autoUpdater.quitAndInstall();

    app.quit();
});


