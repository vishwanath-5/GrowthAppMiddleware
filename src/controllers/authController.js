const djangoService = require("../services/djangoService");

// Login
exports.login = async (req, res) => {
    try {
        const data = await djangoService.loginUser(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.response?.data || "Login failed" });
    }
};

// Register
exports.register = async (req, res) => {
    try {
        const data = await djangoService.registerUser(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.response?.data || "Register failed" });
    }
};