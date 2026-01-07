import { useState } from "react";

export default function AddTeacher() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    classAssigned: "",
    qualification: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/admin/add-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error");
        return;
      }

      alert("Teacher saved");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        classAssigned: "",
        qualification: "",
      });
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="max-w-3xl bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add New Teacher
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter teacher name"
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="teacher@email.com"
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 XXXXX XXXXX"
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Mathematics"
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Assigned Class
          </label>
          <input
            type="text"
            name="classAssigned"
            value={formData.classAssigned}
            onChange={handleChange}
            placeholder="e.g. 8A"
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Qualification
          </label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="B.Ed / M.Sc / M.A"
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Save Teacher
          </button>
        </div>
      </form>
    </div>
  );
}