import Admission from "../models/Admission.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admissions = await Admission.find()
      .sort({ createdAt: -1 });

    res.json(admissions);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;