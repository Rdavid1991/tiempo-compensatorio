import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

console.log("esta vaina");

import App from "./App";

document.addEventListener("DOMContentLoaded", () => {

  ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
    document.getElementById("root")
  );

});

