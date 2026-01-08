import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/teacher/dashboard" },
  { name: "Attendance", path: "/teacher/attendance" },
  { name: "Attendance History", path: "/teacher/attendance-history" },
  { name: "Add Student", path: "/teacher/add-student" },
  { name: "Students", path: "/teacher/students" },
  { name: "Profile", path: "/teacher/profile" },
];

export default function TeacherSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">ERP Teacher</h1>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded transition
               ${isActive ? "bg-yellow-400 text-black" : "hover:bg-slate-700"}`
            }
          >
            {item.name}
          </NavLink>
        ))}

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("teacherToken");
            window.location.href = "/teacher/login";
          }}
          className="mt-6 px-4 py-3 rounded bg-red-600 hover:bg-red-700 transition"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
