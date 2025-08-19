const express = require('express');
const verifyUser = require('../middleware/verifyUser'); // Assuming you have a middleware for user verification
const wishlistController = require('../controllers/wishlistController');
const {createWishlistHandler,deleteWishlistItemHandler, getWishlistHandler} = wishlistController;
const router = express.Router();

// Add item to wishlist
router.route("/")
    .post(verifyUser,createWishlistHandler)
    
// Delete item from wishlist by hotelId
router.route("/")
    .delete(verifyUser,deleteWishlistItemHandler);

// Get all wishlist items
router.route("/")
    .get(verifyUser,getWishlistHandler);
    
module.exports = router;