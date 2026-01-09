import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Session expired");
      navigate("/teacher/forgot-password");
      return;
    }

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
      alert(data.message);
      return;
    }

    localStorage.setItem("resetToken", data.resetToken);

    navigate("/teacher/reset-password");
  };

  const handleResend = async () => {
    await fetch(
      "http://localhost:5000/api/teachers/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    alert("OTP resent");
  };

  return (
    <form onSubmit={handleVerify}>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />

      <button type="button" onClick={handleResend}>
        Resend OTP
      </button>

      <button type="submit">Verify OTP</button>
    </form>
  );
}
