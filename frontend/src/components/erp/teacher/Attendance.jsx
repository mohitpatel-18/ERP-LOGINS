import { useEffect, useState } from "react";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("teacherToken");

    const payload = JSON.parse(atob(token.split(".")[1]));
    const classAssigned = payload.classAssigned;

    fetch(`http://localhost:5000/api/students/class/${classAssigned}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const mark = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  const submitAttendance = async () => {
    const records = students.map(s => ({
      studentId: s._id,
      status: attendance[s._id] || "Absent",
    }));

    const res = await fetch("http://localhost:5000/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
      },
      body: JSON.stringify({ date, records }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Attendance</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-2 mb-4"
      />

      <div className="bg-white p-4 rounded shadow space-y-3">
        {students.map((s) => (
          <div key={s._id} className="flex justify-between">
            <span>{s.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => mark(s._id, "Present")}
                className="bg-green-500 px-3 py-1 text-white rounded"
              >
                P
              </button>
              <button
                onClick={() => mark(s._id, "Absent")}
                className="bg-red-500 px-3 py-1 text-white rounded"
              >
                A
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={submitAttendance}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Submit Attendance
      </button>
    </>
  );
}
