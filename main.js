const path = require('path');
const fs = require('fs');
const { dialog, app, BrowserWindow, Menu, ipcMain, screen } = require('electron');

function createWindow() {

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    let win = new BrowserWindow({
        minWidth      : (width * 0.7),
        minHeight     : (height * 0.8),
        width         : (width * 0.7),
        height        : (height * 0.8),
        webPreferences: {
            preload: path.join(__dirname, "script.js"),
        },
    });

    // let winChild = new BrowserWindow({
    //     minWidth      : width * 0.4,
    //     minHeight     : height * 0.4,
    //     webPreferences: {
    //         preload: path.join(__dirname, "script.js"),
    //     },
    //     parent: win, 
    //     modal : true, 
    //     show  : false,
    //     frame : false
    // });


    const template = [
        {
            label  : "Desarrollador",
            submenu: [{
                label: 'abrir',
                click: () => {
                    win.webContents.toggleDevTools();
                }
            }, {
                label: 'Exportar copia DB  👇🏼 ',
                click: () => {

                    win.webContents.send("data", []);

                    ipcMain.on("data", (event, data) => {

                        dialog.showSaveDialog(win, { filters: [{ name: 'TIEMPO COMPENSATORIO', extensions: ['json'] }] }).then((fileName) => {

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
                }
            },
            {
                label: 'Importar copia DB ☝🏼 ',
                click: () => {
                    // winChild.loadURL("file:///" + path.join(__dirname, '/build/index.html') + "#/employed/nolgiE");
                    // winChild.show();

                    // winChild.on("close",(e)=>{
                    //     e.preventDefault();

                    //     winChild.hide();
                    // });
                }
            }
            ]
        },
        {
            label  : "Temas",
            submenu: [{
                label: 'Morph',
                click: () => {
                    win.webContents.send("tema", "morph");
                }
            },
            {
                label: 'Slate',
                click: () => {
                    win.webContents.send("tema", "slate");
                }
            },
            {
                label: 'Sketchy',
                click: () => {
                    win.webContents.send("tema", "sketchy");
                }
            },
            {
                label: 'Solar',
                click: () => {
                    win.webContents.send("tema", "solar");
                }
            },
            {
                label: 'Superhero',
                click: () => {
                    win.webContents.send("tema", "superhero");
                }
            }]
        }

    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    win.loadFile(path.join(__dirname, '/build/index.html'));
    
    win.once('ready-to-show', () => {
        win.show();
    });

    win.on("closed", () => {
        win = null;
    });
}

app.whenReady().then(createWindow);
