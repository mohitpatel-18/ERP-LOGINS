import { Routes, Route } from "react-router-dom";

import Home from "./components/home/Home.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";
import Erp from "./components/erp/Erp.jsx";
import AdminLogin from "./components/erp/AdminLogin.jsx";
import StudentLogin from "./components/erp/StudentLogin.jsx";
import TeacherLogin from "./components/erp/TeacherLogin.jsx";
import AdminDashboard from "./components/erp/AdminDashboard.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/erp" element={<Erp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;

