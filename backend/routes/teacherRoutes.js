import express from "express";
import {
  getAllTeachers,
  teacherLogin,
  addTeacher,
  getMyProfile,
  updateMyProfile,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/teacherController.js";

import teacherAuth from "../middleware/teacherAuth.js";

const router = express.Router();

/* =========================
   AUTH
========================= */
router.post("/login", teacherLogin);

/* =========================
   ADMIN / TEACHERS
========================= */
router.get("/", getAllTeachers);
router.post("/add", addTeacher);

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
