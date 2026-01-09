import { useState } from "react";

export default function AddTeacher() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    classAssigned: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("http://localhost:5000/api/admin/add-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIX: admin token
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error while saving teacher");
        setLoading(false);
        return;
      }

      alert("✅ Teacher added successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        classAssigned: "",
      });
    } catch (error) {
      alert("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Add New Teacher
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Fill in the details to create a new teacher account
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter teacher name"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="teacher@email.com"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 XXXXXXXXXX"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Mathematics"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Assigned Class
          </label>
          <input
            type="text"
            name="classAssigned"
            value={formData.classAssigned}
            onChange={handleChange}
            placeholder="e.g. 10A"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <div className="md:col-span-2 flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
}
