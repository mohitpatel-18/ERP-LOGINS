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
import AttendanceReports from "./components/erp/admin/AttendanceReports";

/* Teacher */
import ProtectedTeacherRoute from "./components/erp/teacher/ProtectedTeacherRoute";
import TeacherLayout from "./components/erp/teacher/TeacherLayout";
import TeacherDashboard from "./components/erp/teacher/TeacherDashboard";
import AttendanceHistory from "./components/erp/teacher/AttendanceHistory";
import ClassStudents from "./components/erp/teacher/ClassStudents";
import TeacherProfile from "./components/erp/teacher/TeacherProfile";
import Attendance from "./components/erp/teacher/Attendance";
import AddStudent from "./components/erp/teacher/AddStudent";



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

      {/* ADMIN */}
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
        <Route path="attendance-reports" element={<AttendanceReports />} />
      </Route>

      {/* TEACHER */}
      <Route
        path="/teacher"
        element={
          <ProtectedTeacherRoute>
            <TeacherLayout />
          </ProtectedTeacherRoute>
        }
      >
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="attendance-history" element={<AttendanceHistory />} />
        <Route path="students" element={<ClassStudents />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="add-student" element={<AddStudent />} />
      </Route>
    </Routes>
  );
}
