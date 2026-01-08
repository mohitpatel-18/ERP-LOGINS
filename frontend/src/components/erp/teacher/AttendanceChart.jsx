import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AttendanceChart() {
  const [data, setData] = useState([]);
  const teacher = JSON.parse(localStorage.getItem("teacher"));

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/attendance/stats/${teacher.classAssigned}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData([
          { name: "Present", value: res.present },
          { name: "Absent", value: res.absent },
        ]);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold mb-4">
        Attendance Overview (%)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
