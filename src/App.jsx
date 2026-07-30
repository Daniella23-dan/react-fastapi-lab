import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";

function Dashboard() {
  return <h2>Welcome to your Student Management Dashboard</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/add" element={<AddStudent />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
