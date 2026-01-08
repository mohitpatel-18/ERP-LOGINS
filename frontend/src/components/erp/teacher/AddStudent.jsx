import { useState } from "react";

export default function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    classAssigned: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    const res = await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-xl bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add Student</h2>

      {["name", "email", "rollNo", "classAssigned"].map((f) => (
        <input
          key={f}
          name={f}
          placeholder={f.toUpperCase()}
          onChange={handleChange}
          className="w-full border px-4 py-2 mb-4 rounded"
        />
      ))}

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Add Student
      </button>
    </div>
  );
}
