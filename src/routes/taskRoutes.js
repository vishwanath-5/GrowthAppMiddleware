const express = require("express");
const router = express.Router();
const axios = require("axios");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const DJANGO_URL = process.env.DJANGO_URL;
// 🔐 Middleware check (extra safety)
const validateHandler = (handler) => {
  if (typeof handler !== "function") {
    throw new Error("Route handler must be a function");
  }
  return handler;
};

// 📋 GET ALL TASKS
// GET TASKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const response = await axios.get(
      `${DJANGO_URL}/api/tasks/`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {  // ✅ error defined here
    console.error(
      "GET ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
  }
});
// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const response = await axios.post(
      `${DJANGO_URL}/api/tasks/`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});
// 🔄 UPDATE TASK (PATCH)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.patch(
      `${DJANGO_URL}/api/tasks/${id}/`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("PATCH ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to update task" });
  }
});
// ❌ DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await axios.delete(
      `${DJANGO_URL}/api/tasks/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(
      "DELETE ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({ error: "Failed to delete task" });
  }
});
module.exports = router;
