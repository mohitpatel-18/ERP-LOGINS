import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const generatePassword = () =>
  Math.random().toString(36).slice(-8);

/* =========================
   ADD STUDENT (ADMIN)
========================= */
export const addStudent = async (req, res) => {
  try {
    const { name, email, classAssigned, rollNo } = req.body;

    const exists = await Student.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Student already exists" });

    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await Student.create({
      name,
      email,
      classAssigned,
      rollNo,
      password: hashedPassword,
    });

    await sendEmail(
      email,
      "Student Login Credentials",
      `
        <h3>Welcome ${name}</h3>
        <p>Email: <b>${email}</b></p>
        <p>Password: <b>${plainPassword}</b></p>
        <p>Please login to your student account.</p>
      `
    );

    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    console.error("ADD STUDENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   STUDENT LOGIN
========================= */
export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, student.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: student._id,
        role: "student",
        classAssigned: student.classAssigned,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        classAssigned: student.classAssigned,
        rollNo: student.rollNo,
      },
    });
  } catch (err) {
    console.error("STUDENT LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   FORGOT PASSWORD (SEND OTP) ✅
========================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });
    if (!student)
      return res.status(404).json({ message: "Email not registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    student.resetOTP = otp;
    student.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
    await student.save();

    await sendEmail(
      email,
      "Student Password Reset OTP",
      `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`
    );

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("STUDENT FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   VERIFY OTP ✅
========================= */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const student = await Student.findOne({ email });

    if (
      !student ||
      student.resetOTP !== otp ||
      student.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    student.resetOTP = null;
    student.resetOTPExpiry = null;

    const resetToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    student.resetPasswordToken = resetToken;
    student.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;

    await student.save();

    res.json({ resetToken });
  } catch (err) {
    console.error("STUDENT VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   RESET PASSWORD ✅
========================= */
export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const student = await Student.findOne({
      email: decoded.email,
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!student)
      return res.status(400).json({ message: "Invalid or expired token" });

    student.password = await bcrypt.hash(password, 10);
    student.resetPasswordToken = null;
    student.resetPasswordExpiry = null;

    await student.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("STUDENT RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET STUDENTS (TEACHER)
========================= */
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET STUDENTS BY CLASS
========================= */
export const getStudentsByClass = async (req, res) => {
  try {
    const { classAssigned } = req.params;
    const students = await Student.find({ classAssigned });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
