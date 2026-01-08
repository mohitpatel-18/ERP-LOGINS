import express from "express";
import { getAllTeachers, teacherLogin } from "../controllers/teacherController.js";

const router = express.Router();

// LOGIN
router.post("/login", teacherLogin);

// GET ALL TEACHERS
router.get("/", getAllTeachers);

export default router;
