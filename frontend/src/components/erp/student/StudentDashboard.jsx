import { Outlet } from "react-router-dom";
import { useState } from "react";
import StudentSidebar from "./StudentSidebar";

export default function StudentLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <StudentSidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1">
        
        {/* Top Navbar */}
        <div className="bg-white shadow px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl font-bold"
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold">Student Dashboard</h1>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
