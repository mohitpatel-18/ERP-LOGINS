import express from "express";
import {
  getAllTeachers,
  teacherLogin,
  deleteTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/login", teacherLogin);
router.get("/", getAllTeachers);
router.delete("/:id", deleteTeacher);

export default router;
