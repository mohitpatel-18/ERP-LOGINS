import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";

export const registerTeacher = async (req, res) => {
  try {
    const { name, email, mobile, subject, assignedClass } = req.body;

    // check existing teacher
    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    // default password (later email this)
    const hashedPassword = await bcrypt.hash("teacher123", 10);

    const teacher = await Teacher.create({
      name,
      email,
      mobile,
      subject,
      assignedClass,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Teacher registered successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

