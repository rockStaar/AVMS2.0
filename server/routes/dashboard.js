import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/security", verifyToken, authorizeRoles("security"), (req, res) => {
  res.json({ message: "Welcome Security Guard!" });
});

router.get("/resident", verifyToken, authorizeRoles("resident"), (req, res) => {
  res.json({ message: "Welcome Resident!" });
});

export default router;
