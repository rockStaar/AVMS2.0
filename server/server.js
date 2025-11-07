import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import visitorRoutes from "./routes/visitorRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Configure CORS (allow your frontend port)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // adjust as needed
    credentials: true,
  })
);

// ✅ Health check
app.get("/ping", (req, res) => res.send("pong 🏓"));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/visitor", visitorRoutes);

// ✅ 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log("🧩 Active routes:");
  console.log(`
    /api/auth
    /api/dashboard
    /api/visitor
    /ping
  `);
});
