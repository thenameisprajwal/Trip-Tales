
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const loginHandler = async (req, res) => {
    try {
        console.log("Login request body:", req.body);

        // try both string and number in query to avoid type mismatch issues
        const user = await User.findOne({
            $or: [
                { number: req.body.number },
                { number: Number(req.body.number) }
            ]
        });

        console.log("User found:", user);

        if (!user) {
            return res.status(401).json({ message: "number not found" });
        }

        const decodedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        console.log("Decoded password:", decodedPassword);

        if (decodedPassword !== req.body.password) {
            return res.status(401).json({ message: "Wrong password" });
        }

        // ✅ Generate access token
        const accessToken = jwt.sign(
            { id: user._id, username: user.username },  // payload
            process.env.ACCESS_TOKEN,                   // secret key
            { expiresIn: "3d" }                         // optional expiry
        );

        // ✅ exclude password before sending response
        const { password, ...userWithoutPassword } = user._doc;

        res.json({
            message: "Login successful",
            user: userWithoutPassword,
            accessToken
        });

    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
}
module.exports = loginHandler;