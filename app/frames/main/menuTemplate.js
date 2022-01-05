const { dialog } = require('electron');
const fs = require("fs");

exports.menuTemplate = (win) => {
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
                    win.webContents.send("request", []);
                }
            },
            {
                label: 'Importar copia DB ☝🏼 ',
                click: () => {

                    dialog.showOpenDialog(win, {
                        properties: ["openFile"],
                        filters   : [{ name: 'TIEMPO COMPENSATORIO', extensions: ['json'] }]
                    }).then((file) => {
                        console.log(file);
                        if (!file.canceled) {
                            fs.readFile(file.filePaths[0], 'utf8', (err, data) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                win.webContents.send("import", data);
                            });
                        }
                    });
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


    return template;
};

