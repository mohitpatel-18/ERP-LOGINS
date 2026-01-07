export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">
            Register New Teacher
          </h2>
          <p>Add teacher details and assign classes</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">
            Manage Teachers
          </h2>
          <p>View, edit or remove teachers</p>
        </div>
      </div>
    </div>
  );
}
