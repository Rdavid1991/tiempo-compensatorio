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

function App() {
  const { pathname } = useLocation();

  return (
    <div className={pathname === "/" || pathname.match(/employed/g) ? "container" : ""}>
      <div className={pathname === "/" || pathname.match(/employed/g) ? "mt-5" : ""}>

        <Routes>
          <Route path="/" element={<HomeTable />}/>
          <Route path="/employed/:employeeKey" element={<EmployeeTable />}/>

          {/* modales de home */}
          <Route path="/add_employ" element={<AddEmployer />}/>
          <Route path="/edit_employ/:id" element={<EditEmploy/>}/>

          {/* modales employ */}
          <Route path="/add_time/:employeeKey" element={<AddTime/>}/>
          <Route path="/edit_time/:employeeKey/:id" element={<EditTime/>}/>
          <Route path="/use_time/:employeeKey/:id" element={<UseTime/>}/>


        </Routes>
      </div>
    </div>
  );
}

export default App;
