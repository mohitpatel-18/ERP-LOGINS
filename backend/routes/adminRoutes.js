import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { addTeacher } from "../controllers/teacherController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* =========================
   ADMIN AUTH
========================= */
router.post("/login", adminLogin);

/* =========================
   ADMIN ACTIONS
========================= */
router.post("/add-teacher", adminAuth, addTeacher);

export default router;
