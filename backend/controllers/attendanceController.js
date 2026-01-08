import Attendance from "../models/Attendance.js";

/* ===============================
   1️⃣ MARK ATTENDANCE (Teacher)
================================ */
export const markAttendance = async (req, res) => {
  try {
    const { date, records } = req.body;

    const attendance = await Attendance.create({
      teacher: req.teacher.id,
      classAssigned: req.teacher.classAssigned,
      date,
      records,
    });

    res.status(201).json({
      message: "Attendance saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   2️⃣ TEACHER ATTENDANCE HISTORY
================================ */
export const myAttendanceHistory = async (req, res) => {
  try {
    const history = await Attendance.find({
      teacher: req.teacher.id,
    })
      .populate("records.student", "name rollNo")
      .sort({ date: -1 });

    res.json(history); // ALWAYS ARRAY
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   3️⃣ ATTENDANCE STATS (Teacher)
================================ */
export const getAttendanceStats = async (req, res) => {
  try {
    const records = await Attendance.find({
      teacher: req.teacher.id,
    });

    let present = 0;
    let absent = 0;

    records.forEach((a) => {
      a.records.forEach((r) => {
        r.status === "Present" ? present++ : absent++;
      });
    });

    const total = present + absent;
    const percentage = total ? Math.round((present / total) * 100) : 0;

    res.json({ present, absent, percentage });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   4️⃣ ADMIN – ALL ATTENDANCE
================================ */
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   5️⃣ ADMIN – CLASS + DATE
================================ */
export const getAttendanceByClassAndDate = async (req, res) => {
  try {
    const { classAssigned, date } = req.params;

    const attendance = await Attendance.findOne({ classAssigned, date })
      .populate("teacher", "name email")
      .populate("records.student", "name rollNo");

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
