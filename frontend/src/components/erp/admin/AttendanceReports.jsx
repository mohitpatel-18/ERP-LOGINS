import { useEffect, useState } from "react";

export default function AttendanceReports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/attendance/admin/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Attendance Reports</h2>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Teacher</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Records</th>
            </tr>
          </thead>
          <tbody>
            {data.map((a) => (
              <tr key={a._id} className="border-b">
                <td className="p-3">
                  {a.teacher?.name}
                  <br />
                  <span className="text-xs text-gray-500">
                    {a.teacher?.email}
                  </span>
                </td>
                <td className="p-3">{a.classAssigned}</td>
                <td className="p-3">
                  {new Date(a.date).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {a.records.map((r, i) => (
                    <div key={i}>
                      {r.studentName} —{" "}
                      <span
                        className={
                          r.status === "Present"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
