const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

/**
 * ✅ FINAL CORS CONFIG (ONLY ONCE)
 * - Allows frontend (Render + local)
 * - Supports credentials (JWT)
 */
app.use(
  cors({
    origin: ["https://growthappfrontend.onrender.com", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ✅ Body parser
app.use(express.json());

// ✅ Debug middleware (optional but useful)
app.use((req, res, next) => {
  console.log("👉 Request:", req.method, req.url);
  console.log("👉 Headers:", req.headers);
  next();
});

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 Middleware API running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
