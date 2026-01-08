import { Outlet } from "react-router-dom";
import { useState } from "react";
import TeacherSidebar from "./TeacherSidebar";

export default function TeacherLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <TeacherSidebar open={open} setOpen={setOpen} />

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
          <h1 className="text-xl font-semibold">Teacher Dashboard</h1>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
