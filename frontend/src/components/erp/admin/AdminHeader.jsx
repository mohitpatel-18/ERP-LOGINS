export default function AdminHeader() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold">👋 Welcome, Admin</h2>

      <div className="flex items-center gap-4">
        <span className="text-xl cursor-pointer">🔔</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="admin"
          className="rounded-full"
        />
      </div>
    </div>
  );
}
