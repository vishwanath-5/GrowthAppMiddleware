const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const FRONTEND_URL = "https://growthappfrontend-1.onrender.com";
// 🔥 1. CORS FIRST (VERY IMPORTANT)
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 🔥 2. Handle preflight (OPTIONS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ preflight success
  }

  next();
});

// 🔥 3. Body parser
app.use(express.json());

// 🔥 4. Debug (optional)
app.use((req, res, next) => {
  console.log("HEADERS RECEIVED:", req.headers);
  next();
});

// 🔥 5. Routes (AFTER CORS)
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 🔥 6. Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// 🔥 7. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
