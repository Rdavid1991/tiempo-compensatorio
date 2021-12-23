const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
    let win = new BrowserWindow({
        minWidth      : 800,
        minHeight     : 600,
        webPreferences: {
            nodeIntegration: true,
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
        }
    ];

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
    win.loadFile(path.join(__dirname, '/build/index.html'));
}

app.whenReady().then(createWindow);
