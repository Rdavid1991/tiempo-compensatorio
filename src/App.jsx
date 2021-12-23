import React from "react";
import { Route, Routes } from "react-router";
import { HomeTable } from "./components/home/HomeTable";
import { EmployeeTable } from "./components/employ/EmployeeTable";

function App() {
  return (
    <div className="container">

      <div className="mt-5">
        <Routes>
          <Route path="/" element={<HomeTable />} />
          <Route path="/employed" element={<EmployeeTable />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
