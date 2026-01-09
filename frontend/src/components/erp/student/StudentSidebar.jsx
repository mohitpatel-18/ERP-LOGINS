import { NavLink, useNavigate } from "react-router-dom";

export default function StudentSidebar({ open }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("studentToken");
    navigate("/student/login");
  };

  return (
    <div
      className={`bg-gray-900 text-white w-64 p-5 space-y-6 ${
        open ? "block" : "hidden"
      } md:block`}
    >
      <h2 className="text-2xl font-bold mb-6">ERP Student</h2>

      <nav className="space-y-3">
        <NavLink
          to="/student/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/student/profile"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          Profile
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="bg-red-600 w-full py-2 rounded mt-10"
      >
        Logout
      </button>
    </div>
  );
}
