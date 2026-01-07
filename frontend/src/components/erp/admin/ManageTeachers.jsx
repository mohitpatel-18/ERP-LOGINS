import { useEffect, useState } from "react";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teachers");
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch teachers");
        return;
      }

      setTeachers(data);
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading teachers...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Teachers
      </h2>

      {teachers.length === 0 ? (
        <p className="text-gray-500 text-center">
          No teachers found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Phone</th>
                <th className="border px-4 py-2 text-left">Subject</th>
                <th className="border px-4 py-2 text-left">Class</th>
                <th className="border px-4 py-2 text-left">Qualification</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="hover:bg-gray-50"
                >
                  <td className="border px-4 py-2">
                    {teacher.name}
                  </td>
                  <td className="border px-4 py-2">
                    {teacher.email}
                  </td>
                  <td className="border px-4 py-2">
                    {teacher.phone}
                  </td>
                  <td className="border px-4 py-2">
                    {teacher.subject}
                  </td>
                  <td className="border px-4 py-2">
                    {teacher.classAssigned || "-"}
                  </td>
                  <td className="border px-4 py-2">
                    {teacher.qualification || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
