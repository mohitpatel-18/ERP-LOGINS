import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/teachers/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("OTP sent to email");
localStorage.setItem("resetEmail", email);

      navigate("/teacher/verify-otp", {
        state: { email },
      });

    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSendOtp}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <input
          type="email"
          required
          placeholder="Enter registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher)
      return res.status(404).json({ message: "Email not registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    teacher.resetOtp = otp;
    teacher.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // ✅ DATE object
    await teacher.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`
    );

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("FORGOT OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
  
  // 🔐 generate secure reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  teacher.resetOTP = resetToken;
  teacher.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
  await teacher.save();

  res.json({
    message: "OTP verified",
    resetToken,
  });
};

