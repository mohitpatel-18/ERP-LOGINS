import { Navigate } from "react-router-dom";

export default function ProtectedStudentRoute({ children }) {
  const token = localStorage.getItem("studentToken");

  if (!token) {
    return <Navigate to="/student/login" />;
  }

  return children;
}
