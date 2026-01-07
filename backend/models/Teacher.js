import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    phone: String,
    subject: String,
    classAssigned: String,
    qualification: String,

    // login fields
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "teacher",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
