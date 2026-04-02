const axios = require("axios");

const BASE_URL = "https://growthappbackend.onrender.com";


// 🔐 LOGIN
const loginUser = async (data) => {
    console.log("🔥 LOGIN REQUEST:", req.body);
    const res = await axios.post(`${BASE_URL}/token/`, data);
    return res.data;
};


// 📝 REGISTER
const registerUser = async (data) => {
    const res = await axios.post(`${BASE_URL}/users/register/`, data);
    return res.data;
};


// 📋 GET TASKS
const getTasks = async (token) => {
    try {
        console.log("🔥 SENDING TOKEN TO DJANGO:", token);

        const res = await axios.get(`${BASE_URL}/tasks/`, {
            headers: {
                Authorization: `Bearer ${token}`, // ✅ GUARANTEED
            },
        });

        return res.data;

    } catch (error) {
        console.error("❌ DJANGO ERROR:", error.response?.data);

        throw {
            status: error.response?.status || 500,
            data: error.response?.data || "Failed to fetch tasks",
        };
    }
};


// ➕ CREATE TASK
const createTask = async (token, data) => {
    const res = await axios.post(`${BASE_URL}/tasks/`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};


// ✏️ UPDATE TASK
const updateTask = async (token, id, data) => {
    const res = await axios.put(`${BASE_URL}/tasks/${id}/`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};


// ❌ DELETE TASK
const deleteTask = async (token, id) => {
    const res = await axios.delete(`${BASE_URL}/tasks/${id}/`, {
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