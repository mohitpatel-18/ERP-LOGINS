import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

const generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};

// ADD TEACHER
export const addTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      classAssigned,
      qualification,
    } = req.body;

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(409).json({ message: "Teacher already exists" });
    }

    const plainPassword = generatePassword();
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
      "Your Teacher Account Credentials",
      `
        <h3>Welcome ${name}</h3>
        <p>Your teacher account has been created.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${plainPassword}</p>
        <p>Please login and change your password.</p>
      `
    );

    res.status(201).json({
      message: "Teacher added & email sent",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL TEACHERS
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
import jwt from "jsonwebtoken";

export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: teacher._id, role: "teacher" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

