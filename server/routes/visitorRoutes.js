import express from "express";
import Visitor from "../models/Visitor.js";

const router = express.Router();

// 🧪 Health check for Visitor routes
router.get("/", (req, res) => {
  res.send("✅ Visitor route is alive");
});

// 📝 Create a new visitor entry
router.post("/create", async (req, res) => {
  try {
    const { name, phone, flat, purpose } = req.body;

    // Validate all fields
    if (!name || !phone || !flat || !purpose) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new visitor document
    const visitor = new Visitor({ name, phone, flat, purpose });
    await visitor.save();

    // Send success response
    res.status(201).json({ message: "Visitor entry created", visitor });
  } catch (err) {
    console.error("❌ Error creating visitor:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// 📋 Fetch all visitors
router.get("/all", async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ timeIn: -1 }); // Most recent first
    res.status(200).json(visitors); // ✅ Return clean array
  } catch (err) {
    console.error("❌ Error fetching visitors:", err);
    res.status(500).json({ error: "Failed to fetch visitors" });
  }
});

export default router;
