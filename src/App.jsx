import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function Dashboard() {
  return <h2>Welcome to your Student Management Dashboard</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;