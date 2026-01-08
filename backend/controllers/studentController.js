import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

const generatePassword = () =>
  Math.random().toString(36).slice(-8);

// ✅ ADD STUDENT
export const addStudent = async (req, res) => {
  try {
    const { name, email, classAssigned, rollNo } = req.body;

    const exists = await Student.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Student already exists" });

    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const student = await Student.create({
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
        <p>Please login and change your password.</p>
      `
    );

    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET STUDENTS (Teacher view)
export const getStudents = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
};
// ✅ GET STUDENTS BY CLASS
export const getStudentsByClass = async (req, res) => {
  try {
    const { classAssigned } = req.params;

    const students = await Student.find({ classAssigned });

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};