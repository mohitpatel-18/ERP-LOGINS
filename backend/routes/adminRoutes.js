import express from "express";
import { addTeacher } from "../controllers/teacherController.js";
import { adminLogin } from "../controllers/adminController.js";
const router = express.Router();

// POST → Add Teacher
router.post("/add-teacher", addTeacher);
router.post("/login", adminLogin);
export default router;
