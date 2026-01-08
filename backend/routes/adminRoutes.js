import express from "express";
import { addTeacher } from "../controllers/teacherController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/add-teacher", adminAuth, addTeacher);

export default router;
