/* eslint-disable no-prototype-builtins */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-case-declarations */
const { ipcRenderer } = require("electron");

const applyTheme = (theme) => {
    const themeElements = document.querySelectorAll("[class^='theme']");
    themeElements.forEach((element) => {
        if (!!element.className.match(theme)) {
            element.disabled = false;
        }
    });

    setTimeout(() => {
        themeElements.forEach((element) => {
            if (!!!element.className.match(theme)) {
                element.disabled = true;
            }
        });
    }, 500);

    localStorage.setItem("style", theme);
};

ipcRenderer.on("tema", (event, theme) => {

    switch (theme) {
        case "morph":
            applyTheme(theme);
            break;
        case "slate":
            applyTheme(theme);
            break;
        case "sketchy":
            applyTheme(theme);
            break;
        case "solar":
            applyTheme(theme);
            break;
        case "superhero":
            applyTheme(theme);
            break;

        default:
            break;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.hasOwnProperty("style")) {
        applyTheme(localStorage.getItem("style"));
    } else {
        applyTheme("slate");
    }

    ipcRenderer.on("data", (event, array) => {

        let __data = [];

        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key !== "style") {
                __data.push({
                    key,
                    data: JSON.parse(localStorage.getItem(key))
                });
            }
        }
        ipcRenderer.send("data", JSON.stringify(__data));
    });
});