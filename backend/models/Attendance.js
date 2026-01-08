import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    classAssigned: String,
    date: String,
    records: [
      {
        studentName: String,
        status: {
          type: String,
          enum: ["Present", "Absent"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;