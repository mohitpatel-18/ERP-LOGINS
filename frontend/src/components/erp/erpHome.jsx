import { Link } from "react-router-dom";

export default function ErpHome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">

      <h1 className="text-3xl font-bold mb-4">
        ERP Login Portal
      </h1>

      <div className="flex gap-4">
        <Link to="/student/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Student Login
          </button>
        </Link>

        <Link to="/teacher/login">
          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Teacher Login
          </button>
        </Link>

        <Link to="/admin/login">
          <button className="bg-red-600 text-white px-6 py-2 rounded">
            Admin Login
          </button>
        </Link>
      </div>

    </div>
  );
}
