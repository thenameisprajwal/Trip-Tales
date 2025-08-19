const express = require('express');
const router = express.Router();
const Hotel = require("../model/hotel.model");
const singlehotelHandler = require('../controllers/singleHotelController');

//localhost:3500/api/hotel/:id
router.route("/:id") 
    .get(singlehotelHandler); // Fetch single hotel data by ID
    

module.exports = router;