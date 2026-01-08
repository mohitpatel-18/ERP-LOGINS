import express from "express";
import { getAllTeachers, teacherLogin } from "../controllers/teacherController.js";

const router = express.Router();

// LOGIN
router.post("/login", teacherLogin);

// GET ALL TEACHERS
router.get("/", getAllTeachers);

export default router;
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/teacherController.js";
import teacherAuth from "../middleware/teacherAuth.js";

router.get("/me", teacherAuth, getMyProfile);
router.put("/me", teacherAuth, updateMyProfile);
