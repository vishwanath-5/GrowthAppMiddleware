const djangoService = require("../services/djangoService");

// 📋 GET TASKS
const getTasks = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("TOKEN:", req.user?.token);

    if (!req.user || !req.user.token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const tasks = await djangoService.getTasks(req.user.token);

    res.json(tasks);
  } catch (error) {
    console.error("TASK ERROR:", error);

    res.status(error.status || 500).json({
      error: error.data || "Failed to fetch tasks",
    });
  }
};

// ✅ Create New Task
const createTask = async (req, res) => {
  try {
    const token = req.user?.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = await djangoService.createTask(token, {
      title,
      description,
    });

    res.status(201).json({
      success: true,
      data: newTask,
    });

  } catch (error) {
    console.error("CREATE TASK ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || "Failed to create task",
    });
  }
};



// ✅ Update Task
const updateTask = async (req, res) => {
  try {
    const token = req.user?.token;
    const { id } = req.params;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updatedTask = await djangoService.updateTask(
      token,
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updatedTask,
    });

  } catch (error) {
    console.error("UPDATE TASK ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || "Failed to update task",
    });
  }
};



// ✅ Delete Task
const deleteTask = async (req, res) => {
  try {
    const token = req.user?.token;
    const { id } = req.params;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await djangoService.deleteTask(token, id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error("DELETE TASK ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || "Failed to delete task",
    });
  }
};



// ✅ Export All Controllers (IMPORTANT)
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};