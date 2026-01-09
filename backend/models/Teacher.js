
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    phone: String,
    subject: String,
    classAssigned: String,
    qualification: String,

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "teacher",
    },

    // 🔐 PASSWORD RESET
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

export default mongoose.model("Teacher", teacherSchema);
