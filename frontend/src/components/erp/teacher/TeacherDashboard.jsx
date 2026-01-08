export default function TeacherDashboard() {
  const teacher = JSON.parse(localStorage.getItem("teacher"));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Teacher Dashboard</h1>
      <p>Welcome {teacher?.name}</p>
    </div>
  );
}
