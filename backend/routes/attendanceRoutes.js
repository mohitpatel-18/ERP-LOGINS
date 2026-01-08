import express from "express";
import {
  markAttendance,
  myAttendanceHistory,
} from "../controllers/attendanceController.js";
import teacherAuth from "../middleware/teacherAuth.js";

const router = express.Router();

router.post("/", teacherAuth, markAttendance);
router.get("/my", teacherAuth, myAttendanceHistory);

export default router;
