export default function TeacherDashboard() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">My Classes</p>
          <h3 className="text-2xl font-bold mt-2">1</h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Students</p>
          <h3 className="text-2xl font-bold mt-2">—</h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Attendance %</p>
          <h3 className="text-2xl font-bold mt-2">%</h3>
        </div>
      </div>
    </>
  );
}
