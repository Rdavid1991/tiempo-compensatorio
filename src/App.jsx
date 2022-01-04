import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router-dom";
import { HomeTable } from "./components/home/HomeTable";
import { EmployeeTable } from "./components/employ/EmployeeTable";
import "./App.css";
import { AddEmployer } from "./components/home/AddEmployer";

function App() {

  const [homeTable, setHomeTable] = useState();

  useEffect(() => {
    window.homeTable = homeTable;
  }, [homeTable]);

  const { pathname } = useLocation();

  const rutas = useLocation();

  console.log(rutas);
  return (
    <div className={pathname === "/" || pathname.match(/employed/g) ? "container" : ""}>
      <div className={pathname === "/" || pathname.match(/employed/g) ? "mt-5" : ""}>

        <Routes>
          <Route path="/" element={<HomeTable setHomeTable={setHomeTable} />} />
          <Route path="/employed/:employeeKey" element={<EmployeeTable />} />

          <Route path="/add_employ" element={<AddEmployer homeTable={homeTable} />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
