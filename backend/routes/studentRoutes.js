
import express from "express";
import {
  getStudentsByClass,
  addStudent,
  getStudents,
  studentLogin,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/studentController.js";
import teacherAuth from "../middleware/teacherAuth.js";

const router = express.Router();

/* =========================
   AUTH (STUDENT)
========================= */
router.post("/login", studentLogin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

/* =========================
   STUDENTS (TEACHER ACCESS)
========================= */
router.get("/class/:classAssigned", teacherAuth, getStudentsByClass);
router.get("/", teacherAuth, getStudents);
router.post("/", teacherAuth, addStudent);

export default router;
