const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const djangoService = require("../services/djangoService");

// 📋 GET TASKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const data = await djangoService.getTasks(req.token);

    return res.status(200).json(data);
  } catch (error) {
    console.error("GET ERROR:", error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch tasks",
    });
  }
});


// ➕ CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const data = await djangoService.createTask(req.body, req.token);

    return res.status(201).json(data);
  } catch (error) {
    console.error("CREATE ERROR:", error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to create task",
    });
  }
});


// 🔄 UPDATE TASK
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const data = await djangoService.updateTask(id, req.body, req.token);

    return res.status(200).json(data);
  } catch (error) {
    console.error("PATCH ERROR:", error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to update task",
    });
  }
});


// ❌ DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await djangoService.deleteTask(id, req.token);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to delete task",
    });
  }
});

module.exports = router;