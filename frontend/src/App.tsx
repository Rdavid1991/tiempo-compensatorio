import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
import { HomeTable } from "./components/home/HomeTable";
import { TimeTable } from "./components/time/TimeTable";

function App() {
    return (
        <div className="container mt-5">
            <Routes>
                <Route path="/" element={<HomeTable />} />
                <Route path="/employed/:employeeKey" element={<TimeTable />} />
            </Routes>
        </div>
    );
}

export default App;
