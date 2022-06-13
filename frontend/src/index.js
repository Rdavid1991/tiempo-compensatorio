import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";

document.addEventListener("DOMContentLoaded", () => {

    const root = ReactDOM.createRoot(document.getElementById("root"));

    root.render(
        <HashRouter>
            <App />
        </HashRouter>
    );

});
