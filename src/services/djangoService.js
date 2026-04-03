const axios = require("axios");

// ✅ Use ENV (VERY IMPORTANT)
const API = axios.create({
    baseURL: process.env.DJANGO_BASE_URL,
});


// 🔐 LOGIN
const loginUser = async (data) => {
    console.log("🔥 LOGIN REQUEST:", data);

    const res = await API.post("/token/", data);
    return res.data;
};


// 📝 REGISTER
const registerUser = async (data) => {
    const res = await API.post("/users/register/", data);
    return res.data;
};


// 📋 GET TASKS
const getTasks = async (token) => {
    try {
        console.log("🔥 SENDING TOKEN:", token);

        const res = await API.get("/tasks/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;

    } catch (error) {
        console.error("❌ DJANGO ERROR:", error.response?.data || error.message);

        throw {
            status: error.response?.status || 500,
            data: error.response?.data || "Failed to fetch tasks",
        };
    }
};


// ➕ CREATE TASK
const createTask = async (data, token) => {
    const res = await API.post("/tasks/", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};


// ✏️ UPDATE TASK
const updateTask = async (id, data, token) => {
    const res = await API.patch(`/tasks/${id}/`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};


// ❌ DELETE TASK
const deleteTask = async (id, token) => {
    const res = await API.delete(`/tasks/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};


module.exports = {
    loginUser,
    registerUser,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};