import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/login",
        { email, password }
      );

      localStorage.setItem("studentToken", res.data.token);
      navigate("/student/dashboard");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Invalid student credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-600">
          Student Login
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to your student account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@email.com"
            required
          />
        </div>

        {/* Password with eye */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            className="w-full border rounded-lg px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {/* Eye button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Forgot password */}
        <div className="text-center mt-4">
          <Link
            to="/student/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}
