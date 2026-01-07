import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Add Teacher", path: "/admin/add-teacher" },
  { name: "Manage Teachers", path: "/admin/manage-teachers" },
  { name: "Students", path: "/admin/students" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">ERP Admin</h1>

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
      </nav>
    </aside>
  );
}
