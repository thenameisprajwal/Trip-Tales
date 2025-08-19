const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Token should be provided
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        req.user = user; // attach user info to request
        next();
    });
};

module.exports = verifyUser;
