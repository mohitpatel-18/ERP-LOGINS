import express from "express";
import { registerTeacher } from "../controllers/teacherController.js";

const router = express.Router();

router.post("/register", registerTeacher);

export default router;
