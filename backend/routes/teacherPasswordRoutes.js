import express from "express";
import {
  sendResetOTP,
  verifyResetOTP,
  resetPassword,
} from "../controllers/teacherPasswordController.js";

const router = express.Router();

router.post("/send-otp", sendResetOTP);
router.post("/verify-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);

export default router;
