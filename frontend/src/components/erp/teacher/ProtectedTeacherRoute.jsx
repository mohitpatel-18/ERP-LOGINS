import { Navigate } from "react-router-dom";

export default function ProtectedTeacherRoute({ children }) {
  const token = localStorage.getItem("teacherToken");

  if (!token) {
    return <Navigate to="/teacher/login" replace />;
  }

  return children;
}

