import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Session expired. Please try again.");
      navigate("/teacher/forgot-password");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/teachers/verify-otp",
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

      // ✅ SAVE RESET TOKEN
      localStorage.setItem("resetToken", data.resetToken);

      navigate("/teacher/reset-password");
    } catch {
      alert("Server error");
    }
  };

  const handleResend = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/teachers/forgot-password",
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
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full border px-4 py-2 rounded mb-4"
          required
        />

        <button
          type="button"
          onClick={handleResend}
          className="text-blue-600 text-sm mb-4"
        >
          Resend OTP
        </button>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Verify OTP
        </button>
      </form>
    </div>
  );
}
