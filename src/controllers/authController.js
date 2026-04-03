const djangoService = require("../services/djangoService");

// 🔐 LOGIN
exports.login = async (req, res) => {
    try {
        const data = await djangoService.loginUser(req.body);

        return res.status(200).json(data);
    } catch (error) {
        console.error("LOGIN ERROR:", error.response?.data || error.message);

        return res.status(error.response?.status || 500).json({
            error: error.response?.data || "Login failed",
        });
    }
};


// 📝 REGISTER
exports.register = async (req, res) => {
    try {
        const data = await djangoService.registerUser(req.body);

        return res.status(201).json(data);
    } catch (error) {
        console.error("REGISTER ERROR:", error.response?.data || error.message);

        return res.status(error.response?.status || 500).json({
            error: error.response?.data || "Register failed",
        });
    }
};