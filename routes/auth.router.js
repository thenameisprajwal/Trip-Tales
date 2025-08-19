const express = require('express');


const signupHandler = require('../controllers/signupController');
const loginHandler = require('../controllers/loginController');
const router = express.Router();

// REGISTER
router.route("/register")
    .post(signupHandler);

// LOGIN
router.route("/login")
    .post(loginHandler);

module.exports = router;
