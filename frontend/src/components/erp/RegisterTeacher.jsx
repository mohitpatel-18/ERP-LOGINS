import { useState } from "react";
import axios from "axios";

export default function RegisterTeacher() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    assignedClass: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/teachers/register",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      alert("Teacher Registered Successfully");
      setForm({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        assignedClass: "",
      });
    } catch (error) {
      alert("Error registering teacher");
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Register Teacher
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Teacher Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="assignedClass"
          value={form.assignedClass}
          onChange={handleChange}
          placeholder="Assigned Class (eg: 5A)"
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register Teacher
        </button>
      </form>
    </div>
  );
}
