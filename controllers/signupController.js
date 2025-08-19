const CryptoJS = require("crypto-js");
const User = require("../model/user.model");
const signupHandler = async (req, res) => {
    try {
        console.log("Register request body:", req.body);

        const newUser = new User({
            username: req.body.username,
            number: req.body.number, // save exactly as received
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASSWORD_SECRET_KEY
            ).toString()
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.error("Register error:", err.message);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
}
module.exports = signupHandler;