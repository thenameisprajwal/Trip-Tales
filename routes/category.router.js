const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
router.route("/")
    .get(categoryController); 
        

    module.exports = router