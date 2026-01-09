import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TeacherResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email;

  if (!email) {
    navigate("/teacher/login");
    return null;
  }

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/api/teachers/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Password reset successful");
    navigate("/teacher/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border px-4 py-2 rounded mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border px-4 py-2 rounded mb-4"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
