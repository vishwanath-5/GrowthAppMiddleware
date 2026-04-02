const express = require("express");
const router = express.Router();
const axios = require("axios");

// ✅ REGISTER
router.post("/register", async (req, res) => {
    try {
        const response = await axios.post(
            "https://growthappmiddleware.onrender.com/users/register/", // ✅ FIXED
            req.body
        );

        res.json(response.data);
    } catch (error) {
        console.error("REGISTER ERROR:", error.response?.data || error.message);

        res.status(500).json({
            error: error.response?.data || "Registration failed",
        });
    }
});

// ✅ LOGIN (SimpleJWT)
router.post("/login", async (req, res) => {
    try {
        const response = await axios.post(
            "https://growthappmiddleware.onrender.com/token/", // ✅ THIS IS CORRECT
            req.body
        );

        res.json(response.data);
    } catch (error) {
        console.error("LOGIN ERROR:", error.response?.data || error.message);

        res.status(500).json({
            error: error.response?.data || "Login failed",
        });
    }
});

module.exports = router;