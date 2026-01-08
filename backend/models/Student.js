import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    classAssigned: String,
    rollNo: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
