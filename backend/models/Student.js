import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    rollNo: String,
    classAssigned: String,

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "student",
    },

    /* =========================
       PASSWORD RESET (OTP)
    ========================= */
    resetOTP: {
      type: String,
    },

    resetOTPExpiry: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);

