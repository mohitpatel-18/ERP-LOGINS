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
  } catch (err) {
    console.error("GET ALL TEACHERS ERROR:", err);
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
       <p>Email: <b>${email}</b></p>
       <p>Password: <b>${plainPassword}</b></p>
       <p>Please login and change your password.</p>`
    );

    res.status(201).json({ message: "Teacher added successfully" });
  } catch (err) {
    console.error("ADD TEACHER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE TEACHER (ADMIN)
========================= */
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);
    if (!teacher)
      return res.status(404).json({ message: "Teacher not found" });

    await Teacher.findByIdAndDelete(id);

    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.error("DELETE TEACHER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================
   MY PROFILE
========================= */
export const getMyProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select("-password");
    res.json(teacher);
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
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
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
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

    await sendEmail(
      email,
      "Password Reset OTP",
      `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`
    );

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
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
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
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

    // ✅ bcrypt hash confirmed
    teacher.password = await bcrypt.hash(password, 10);
    teacher.resetPasswordToken = null;
    teacher.resetPasswordExpiry = null;
    await teacher.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        id: teacher._id,
        role: "teacher",
        classAssigned: teacher.classAssigned, // 🔥 REQUIRED
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        classAssigned: teacher.classAssigned,
      },
    });
  } catch (err) {
    console.error("TEACHER LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
