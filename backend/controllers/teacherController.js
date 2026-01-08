import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= ADD TEACHER ================= */
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

    const password = "teacher123"; // temp password
    const hashedPassword = await bcrypt.hash(password, 10);

    await Teacher.create({
      name,
      email,
      phone,
      subject,
      classAssigned,
      qualification,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Teacher added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL TEACHERS ================= */
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE TEACHER ================= */
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    await Teacher.findByIdAndDelete(id);
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= TEACHER LOGIN ================= */
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

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
