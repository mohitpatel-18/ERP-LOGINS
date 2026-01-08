import { useEffect, useState } from "react";

export default function AttendanceHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/attendance/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          setHistory([]);
        }
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Attendance History</h2>

      {history.length === 0 && <p>No attendance records found</p>}

      {history.map((a) => (
        <div key={a._id} className="bg-white p-4 mb-4 rounded shadow">
          <h3 className="font-semibold">Date: {a.date}</h3>

          <ul className="mt-2">
            {a.records.map((r) => (
              <li key={r._id}>
                {r.student?.name} — {r.status}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
