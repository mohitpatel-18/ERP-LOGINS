import express from "express";
import { getStudentsByClass, addStudent, getStudents } from "../controllers/studentController.js";
import teacherAuth from "../middleware/teacherAuth.js";

const router = express.Router();

router.get("/class/:classAssigned", teacherAuth, getStudentsByClass);
router.post("/", teacherAuth, addStudent);
router.get("/", teacherAuth, getStudents);

export default router;
