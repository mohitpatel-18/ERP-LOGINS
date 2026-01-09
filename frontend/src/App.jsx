import { Routes, Route } from "react-router-dom";

/* ================= PUBLIC ================= */
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import ErpHome from "./components/erp/erpHome";

/* ================= AUTH ================= */
import AdminLogin from "./components/erp/AdminLogin";
import StudentLogin from "./components/erp/student/StudentLogin";
import TeacherLogin from "./components/erp/teacher/TeacherLogin";

/* ================= ADMIN ================= */
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AdminLayout from "./components/erp/admin/AdminLayout";
import DashboardHome from "./components/erp/admin/DashboardHome";
import AddTeacher from "./components/erp/admin/AddTeacher";
import ManageTeachers from "./components/erp/admin/ManageTeachers";
import ViewStudents from "./components/erp/admin/ViewStudents";
import AttendanceReports from "./components/erp/admin/AttendanceReports";

/* ================= TEACHER ================= */
import ProtectedTeacherRoute from "./components/erp/teacher/ProtectedTeacherRoute";
import TeacherLayout from "./components/erp/teacher/TeacherLayout";
import TeacherDashboard from "./components/erp/teacher/TeacherDashboard";
import Attendance from "./components/erp/teacher/Attendance";
import AttendanceHistory from "./components/erp/teacher/AttendanceHistory";
import ClassStudents from "./components/erp/teacher/ClassStudents";
import TeacherProfile from "./components/erp/teacher/TeacherProfile";
import AddStudent from "./components/erp/teacher/AddStudent";

/* ===== TEACHER PASSWORD RESET (PUBLIC) ===== */
import TeacherForgotPassword from "./components/erp/teacher/ForgotPassword";
import TeacherVerifyOtp from "./components/erp/teacher/VerifyOTP";
import TeacherResetPassword from "./components/erp/teacher/ResetPassword";

/* ================= STUDENT ================= */
import ProtectedStudentRoute from "./components/erp/student/ProtectedStudentRoute";
import StudentLayout from "./components/erp/student/StudentLayout";
import StudentDashboard from "./components/erp/student/StudentDashboard";

/* ===== STUDENT PASSWORD RESET (PUBLIC) ===== */
import StudentForgotPassword from "./components/erp/student/ForgotPassword";
import StudentVerifyOtp from "./components/erp/student/VerifyOtp";
import StudentResetPassword from "./components/erp/student/ResetPassword";

export default function App() {
  return (
    <Routes>
      {/* ========== PUBLIC ========== */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/erp" element={<ErpHome />} />

      {/* ========== AUTH ========== */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/student/login" element={<StudentLogin />} />

      {/* ========== ADMIN DASHBOARD ========== */}
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

      {/* ========== TEACHER DASHBOARD ========== */}
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
        <Route path="add-student" element={<AddStudent />} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>

      {/* ========== TEACHER PASSWORD RESET (PUBLIC) ========== */}
      <Route
        path="/teacher/forgot-password"
        element={<TeacherForgotPassword />}
      />
      <Route
        path="/teacher/verify-otp"
        element={<TeacherVerifyOtp />}
      />
      <Route
        path="/teacher/reset-password"
        element={<TeacherResetPassword />}
      />

      {/* ========== STUDENT DASHBOARD ========== */}
      <Route
        path="/student"
        element={
          <ProtectedStudentRoute>
            <StudentLayout />
          </ProtectedStudentRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
      </Route>

      {/* ========== STUDENT PASSWORD RESET (PUBLIC) ========== */}
      <Route
        path="/student/forgot-password"
        element={<StudentForgotPassword />}
      />
      <Route
        path="/student/verify-otp"
        element={<StudentVerifyOtp />}
      />
      <Route
        path="/student/reset-password"
        element={<StudentResetPassword />}
      />
    </Routes>
  );
}
