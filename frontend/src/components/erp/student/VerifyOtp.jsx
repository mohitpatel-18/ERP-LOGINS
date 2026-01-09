import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentVerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("studentResetEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Session expired. Please try again.");
      navigate("/student/forgot-password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/students/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            otp: otp.toString(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      // ✅ Save reset token
      localStorage.setItem("studentResetToken", data.resetToken);

      navigate("/student/reset-password");
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/students/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      alert("OTP resent successfully");
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full border px-4 py-2 rounded mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="button"
          onClick={handleResend}
          className="text-sm text-blue-600 mb-4"
        >
          Resend OTP
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
