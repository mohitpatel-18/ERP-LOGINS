import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("resetToken");

  // ✅ IMPORTANT FIX
  useEffect(() => {
    if (!token) {
      navigate("/teacher/forgot-password");
    }
  }, [token, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/teachers/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password,
            token, // ✅ CORRECT
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Reset failed");
        return;
      }

      alert("Password reset successful");

      // cleanup
      localStorage.removeItem("resetToken");
      localStorage.removeItem("resetEmail");

      navigate("/teacher/login");
    } catch {
      alert("Server error");
    }
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border px-4 py-2 rounded mb-4"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
