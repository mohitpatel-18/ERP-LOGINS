import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("teacherToken");

    if (!token) {
      navigate("/teacher/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const classAssigned = payload.classAssigned;

      fetch(
        `http://localhost:5000/api/students/class/${classAssigned}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setStudents(data));
    } catch {
      navigate("/teacher/login");
    }
  }, [navigate]);

  const mark = (id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const submitAttendance = async () => {
    if (!date) {
      alert("Please select date");
      return;
    }

    const records = students.map((s) => ({
      studentId: s._id,
      status: attendance[s._id] ?? "Absent", // ✅ SAFE DEFAULT
    }));

    try {
      const res = await fetch(
        "http://localhost:5000/api/attendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "teacherToken"
            )}`,
          },
          body: JSON.stringify({ date, records }),
        }
      );

      const data = await res.json();
      alert(data.message || "Attendance submitted");

      setAttendance({});
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Attendance
      </h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-2 mb-4 rounded"
      />

      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        {students.length === 0 ? (
          <p className="text-gray-500">
            No students found
          </p>
        ) : (
          students.map((s) => (
            <div
              key={s._id}
              className="flex justify-between items-center"
            >
              <span className="font-medium">
                {s.name}
              </span>

              <div className="space-x-2">
                <button
                  onClick={() =>
                    mark(s._id, "Present")
                  }
                  className={`px-3 py-1 rounded text-white ${
                    attendance[s._id] === "Present"
                      ? "bg-green-600"
                      : "bg-green-400"
                  }`}
                >
                  P
                </button>

                <button
                  onClick={() =>
                    mark(s._id, "Absent")
                  }
                  className={`px-3 py-1 rounded text-white ${
                    attendance[s._id] === "Absent"
                      ? "bg-red-600"
                      : "bg-red-400"
                  }`}
                >
                  A
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={submitAttendance}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Submit Attendance
      </button>
    </div>
  );
}
