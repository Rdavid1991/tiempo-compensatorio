
import { Route, Routes } from "react-router";
import { Table } from "./components/home/Table";
import { EmployeeTable } from "./components/employ/EmployeeTable";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/employed" element={<EmployeeTable />} />
      </Routes>
    </div>
  );
}

export default App;
