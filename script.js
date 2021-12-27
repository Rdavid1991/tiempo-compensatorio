/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-case-declarations */
const { ipcRenderer } = require("electron");

const applyTheme = (theme) => {
    const themeElements = document.querySelectorAll("[class^='theme']");
    
    themeElements.forEach((element) => {

        if (!!element.className.match(theme)) {
            element.disabled = false;
        }else{
            element.disabled = true;      
        }

    });

};

ipcRenderer.on("tema", (event , theme) => {

    console.log(theme);

    switch (theme) {
        case "morph":
            applyTheme(theme);
            break;
    
        default:
            break;
    }
});

