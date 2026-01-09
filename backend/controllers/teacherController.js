import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

/* =========================
   GET ALL TEACHERS (ADMIN)
========================= */
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password");
    res.json(teachers);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   ADD TEACHER (ADMIN)
========================= */
export const addTeacher = async (req, res) => {
  try {
    const { name, email, phone, subject, classAssigned, qualification } =
      req.body;

    const exists = await Teacher.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Teacher already exists" });

    const plainPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await Teacher.create({
      name,
      email,
      phone,
      subject,
      classAssigned,
      qualification,
      password: hashedPassword,
    });

    await sendEmail(
      email,
      "Teacher Account Created",
      `<h3>Welcome ${name}</h3>
       <p>Email: ${email}</p>
       <p>Password: ${plainPassword}</p>`
    );

    res.status(201).json({ message: "Teacher added successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   TEACHER LOGIN
========================= */
export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, teacher.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: teacher._id, role: "teacher" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, teacher });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   MY PROFILE ✅ (MISSING FIX)
========================= */
export const getMyProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select("-password");
    res.json(teacher);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { name, phone, qualification } = req.body;

    const teacher = await Teacher.findByIdAndUpdate(
      req.teacher.id,
      { name, phone, qualification },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", teacher });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher)
      return res.status(404).json({ message: "Email not registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    teacher.resetOTP = otp;
    teacher.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
    await teacher.save();

    await sendEmail(email, "Password Reset OTP", `OTP: ${otp}`);

    res.json({ message: "OTP sent" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   VERIFY OTP
========================= */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (
      !teacher ||
      teacher.resetOTP !== otp ||
      teacher.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    teacher.resetOTP = null;
    teacher.resetOTPExpiry = null;

    const resetToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    teacher.resetPasswordToken = resetToken;
    teacher.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
    await teacher.save();

    res.json({ resetToken });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const teacher = await Teacher.findOne({
      email: decoded.email,
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!teacher)
      return res.status(400).json({ message: "Invalid or expired token" });

    teacher.password = await bcrypt.hash(password, 10);
    teacher.resetPasswordToken = null;
    teacher.resetPasswordExpiry = null;
    await teacher.save();

    res.json({ message: "Password reset successful" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
