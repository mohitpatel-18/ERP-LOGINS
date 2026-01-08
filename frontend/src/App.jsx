import { Routes, Route } from "react-router-dom";

/* Public */
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import ErpHome from "./components/erp/erpHome";

/* Auth */
import AdminLogin from "./components/erp/AdminLogin";
import StudentLogin from "./components/erp/StudentLogin";
import TeacherLogin from "./components/erp/teacher/TeacherLogin";

/* Admin */
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AdminLayout from "./components/erp/admin/AdminLayout";
import DashboardHome from "./components/erp/admin/DashboardHome";
import AddTeacher from "./components/erp/admin/AddTeacher";
import ManageTeachers from "./components/erp/admin/ManageTeachers";
import ViewStudents from "./components/erp/admin/ViewStudents";

/* Teacher */
import ProtectedTeacherRoute from "./components/erp/teacher/ProtectedTeacherRoute";
import TeacherDashboard from "./components/erp/teacher/TeacherDashboard";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/erp" element={<ErpHome />} />

      {/* AUTH */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="add-teacher" element={<AddTeacher />} />
        <Route path="manage-teachers" element={<ManageTeachers />} />
        <Route path="students" element={<ViewStudents />} />
      </Route>

      {/* TEACHER DASHBOARD */}
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedTeacherRoute>
            <TeacherDashboard />
          </ProtectedTeacherRoute>
        }
      />
    </Routes>
  );
}
