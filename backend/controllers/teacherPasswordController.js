import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

// 1️⃣ Send OTP
export const sendResetOTP = async (req, res) => {
  const { email } = req.body;

  const teacher = await Teacher.findOne({ email });
  if (!teacher)
    return res.status(404).json({ message: "Email not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  teacher.resetOTP = otp;
  teacher.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 min
  await teacher.save();

  await sendEmail(
    email,
    "Password Reset OTP",
    `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`
  );

  res.json({ message: "OTP sent to email" });
};

// 2️⃣ Verify OTP
export const verifyResetOTP = async (req, res) => {
  const { email, otp } = req.body;

  const teacher = await Teacher.findOne({ email });

  if (
    !teacher ||
    teacher.resetOTP !== otp ||
    teacher.resetOTPExpiry < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified" });
};

// 3️⃣ Reset Password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (newPassword.length < 8)
    return res.status(400).json({ message: "Password must be 8+ characters" });

  const teacher = await Teacher.findOne({ email });

  const hashed = await bcrypt.hash(newPassword, 10);
  teacher.password = hashed;
  teacher.resetOTP = null;
  teacher.resetOTPExpiry = null;

  await teacher.save();

  res.json({ message: "Password reset successful" });
};
