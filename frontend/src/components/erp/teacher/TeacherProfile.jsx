import { useEffect, useState } from "react";

export default function TeacherProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/teachers/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
      },
    })
      .then((res) => res.json())
      .then(setForm);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    const res = await fetch("http://localhost:5000/api/teachers/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
      },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        qualification: form.qualification,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      <input
        className="w-full border p-2 mb-3"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        className="w-full border p-2 mb-3 bg-gray-100"
        value={form.email}
        disabled
      />

      <input
        className="w-full border p-2 mb-3"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
      />

      <input
        className="w-full border p-2 mb-3"
        name="qualification"
        value={form.qualification}
        onChange={handleChange}
        placeholder="Qualification"
      />

      <button
        onClick={updateProfile}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Update Profile
      </button>
    </div>
  );
}
