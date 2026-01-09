import express from "express";
import {
  getAllTeachers,
  teacherLogin,
  addTeacher,
  deleteTeacher,
  getMyProfile,
  updateMyProfile,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/teacherController.js";

import teacherAuth from "../middleware/teacherAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* =========================
   AUTH
========================= */
router.post("/login", teacherLogin);

/* =========================
   ADMIN / TEACHERS
========================= */
router.get("/", adminAuth, getAllTeachers);
router.post("/add", adminAuth, addTeacher);
router.delete("/:id", adminAuth, deleteTeacher);

/* =========================
   PROFILE
========================= */
router.get("/me", teacherAuth, getMyProfile);
router.put("/me", teacherAuth, updateMyProfile);

/* =========================
   PASSWORD RESET FLOW
========================= */
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
