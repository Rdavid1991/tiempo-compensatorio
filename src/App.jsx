import React from "react";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router-dom";
import { HomeTable } from "./components/home/HomeTable";
import { EmployeeTable } from "./components/employ/EmployeeTable";
import "./App.css";
import { AddEmployer } from "./components/home/AddEmployer";
import { EditEmploy } from "./components/home/EditEmploy";
import { AddTime } from "./components/employ/AddTime";
import { EditTime } from "./components/employ/EditTime";
import { UseTime } from "./components/employ/UseTime";
import { ControlDeAgua } from "./components/external/ControlDeAgua";
import { Recepcion } from "./components/external/Recepcion";

function App() {
  const { pathname } = useLocation();

  return (

    <div className="row vh-100">
      <div className="col-1 bg-dark" style={{"borderRadius": "10px" }}>
        <nav className="nav flex-column">
          <a className="nav-link" href="#/">Tiempo compensatorio</a>
          <a className="nav-link" href="#/controldeagua">Control de agua</a>
          <a className="nav-link" href="#/recepcion">Recepción</a>
  
        </nav>
      </div>
      <div className="col-11">
        <div className={pathname === "/" || pathname.match(/employed/g) ? "container" : ""}>
          <div className={pathname === "/" || pathname.match(/employed/g) ? "mt-5" : ""}>
            <Routes>
              <Route path="/" element={<HomeTable />} />
              <Route path="/employed/:employeeKey" element={<EmployeeTable />} />

              {/* modales de home */}
              <Route path="/add_employ" element={<AddEmployer />} />
              <Route path="/edit_employ/:id" element={<EditEmploy />} />

              {/* modales employ */}
              <Route path="/add_time/:employeeKey" element={<AddTime />} />
              <Route path="/edit_time/:employeeKey/:id" element={<EditTime />} />
              <Route path="/use_time/:employeeKey/:id" element={<UseTime />} />
            </Routes>

          </div>
        </div>
        <Routes>
          <Route path="/controldeagua" element={<ControlDeAgua />} />
          <Route path="/recepcion" element={<Recepcion />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
