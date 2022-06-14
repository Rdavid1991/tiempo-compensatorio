/* eslint-disable no-prototype-builtins */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-case-declarations */
import { ipcRenderer } from "electron";

const setSaveData = (data) => {
    ipcRenderer.send("save-data",data);
};

const applyTheme = (theme) => {

    const themeElements = document.querySelectorAll("[class^='theme']") ;
    themeElements.forEach((element : HTMLLinkElement) => {
        if (!!element.className.match(theme)) {
            element.disabled = false;
        }
    });

    setTimeout(() => {
        themeElements.forEach((element : HTMLLinkElement) => {
            if (!!!element.className.match(theme)) {
                element.disabled = true;
            }
        });
    }, 500);

    localStorage.setItem("style", theme);
};

const compareKeyJson = (json : any) =>{

    const __schemaFunctionary = JSON.stringify(["name","department","time"]);
    const __schemaTime = JSON.stringify(["day","start","end","hourTotal","hourUsed","hourLeft","used","usedHourHistory",]);

    if (JSON.stringify(Object.keys(Object.values(json)[1])) === __schemaFunctionary) {
        for (const time of Object.values<any>(json)[1].time) {
            if (JSON.stringify(Object.keys(time)) !== __schemaTime) {
                return false;
            }
        }
    }else{
        return false;
    }
    return true;
};

const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

ipcRenderer.on("verify-theme", () => {
    verifyTheme();
});

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


const verifyTheme = () => {
    if (localStorage.hasOwnProperty("style")) {
        applyTheme(localStorage.getItem("style"));
    } else {
        applyTheme("slate");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    
    window.require = require;

    verifyTheme();

    ipcRenderer.on("request", () => {

        const __data = [];
        let data;

        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key !== "style") {

                data = localStorage.getItem(key);

                __data.push({
                    key,
                    data: isJson(data) ? JSON.parse(data) : data
                });
            }
        }
        ipcRenderer.send("export", JSON.stringify(__data));
    });

    ipcRenderer.on("import", (e, d) => {
        
        console.log("🚀 ~ file: preload.ts ~ line 143 ~ ipcRenderer.on ~ d", d);

        const importData = JSON.parse(d);
        let dataLoaded = true;
        //localStorage.clear();
        for (const element of importData) {
            if(compareKeyJson(element) && element.data && element.key){
                if (element.key === "style"){
                    localStorage.setItem(element.key, (JSON.stringify(element.data as string) as string).replaceAll("\"",""));
                }else{
                    localStorage.setItem(element.key, JSON.stringify(element.data));
                }
            }else{
                dataLoaded = false;
                //localStorage.clear();
                break;
            }
        }

        if (dataLoaded) {
            location.reload();
        }else{
            ipcRenderer.send("load-backup-fail", "fail");
        }
    });
    
   
});