import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { HomeTable } from "./components/home/HomeTable";
import { EmployeeTable } from "./components/employ/EmployeeTable";
import "./App.css";
import { AddEmployer } from "./components/home/AddEmployer";

function App() {

  const [homeTable, setHomeTable] = useState();

  return (
    <div className="container">

      <div className="mt-5">
        <Routes>
          <Route path="/" element={<HomeTable setHomeTable={setHomeTable}/>} />
          <Route path="/add_employ" element={<AddEmployer homeTable={homeTable}/>}/>


          <Route path="/employed/:employeeKey" element={<EmployeeTable/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
