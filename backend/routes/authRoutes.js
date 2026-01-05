import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ message: "Login API working" });
});

export default router;
