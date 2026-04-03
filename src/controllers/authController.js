import djangoAPI from "../utils/appClient.js";

// 🔐 LOGIN
export const login = async (req, res) => {
    try {
        const response = await djangoAPI.post("/token/", req.body);

        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: error.response?.data || "Login failed",
        });
    }
};

// 📝 REGISTER
export const register = async (req, res) => {
    try {
        const response = await djangoAPI.post("/users/register/", req.body);

        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: error.response?.data || "Register failed",
        });
    }
};