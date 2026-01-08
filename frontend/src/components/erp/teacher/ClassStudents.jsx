import { useEffect, useState } from "react";

export default function ClassStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/students", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
      },
    })
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Students</h2>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Roll No</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border-b text-center">
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.classAssigned}</td>
              <td>{s.rollNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
