import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("studentResetToken");

  // ✅ Security check
  useEffect(() => {
    if (!token) {
      navigate("/student/forgot-password");
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

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/students/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password,
            token,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Password reset failed");
        return;
      }

      alert("Password reset successful");

      // cleanup
      localStorage.removeItem("studentResetToken");
      localStorage.removeItem("studentResetEmail");

      navigate("/student/login");
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        {/* New password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1">
            New Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            className="w-full border rounded-lg px-4 py-2 pr-10 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Confirm password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2 outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
