import express from "express";
import { getAllTeachers } from "../controllers/teacherController.js";

const router = express.Router();

// GET → All teachers
router.get("/", getAllTeachers);

export default router;
