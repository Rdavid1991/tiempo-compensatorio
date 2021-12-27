const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
    let win = new BrowserWindow({
        minWidth      : 800,
        minHeight     : 600,
        webPreferences: {
            preload: path.join(__dirname, "script.js")
        },
    });

    const template = [
        {
            label  : "Desarrollador",
            submenu: [{
                label: 'abrir',
                click: () => {
                    win.webContents.toggleDevTools();
                }
            }]
        },
        {
            label  : "Temas",
            submenu: [{
                label: 'Morph',
                click: () => {
                    win.webContents.send("tema", "morph");
                }
            }]
        }
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    win.loadFile(path.join(__dirname, '/build/index.html'));
    //win.loadURL(`http://localhost:3000`);
    //win.reload();


    win.on("closed", () => {
        win = null;
    });
}

app.whenReady().then(createWindow);
