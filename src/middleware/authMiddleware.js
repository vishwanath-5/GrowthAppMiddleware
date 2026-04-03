module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    // ❌ No token
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // ❌ Wrong format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    // ❌ Empty token edge case
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    console.log("EXTRACTED TOKEN:", token);

    // Attach token to request
    req.token = token;

    next();
  } catch (err) {
    console.error("AUTH MIDDLEWARE ERROR:", err.message);

    return res.status(500).json({ error: "Authentication middleware failed" });
  }
};
