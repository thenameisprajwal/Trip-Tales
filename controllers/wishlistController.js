const Wishlist = require('../model/wishlist.model');
const createWishlistHandler = async (req, res) => {
    try {
        const newWishlist = new Wishlist(req.body);
        const savedWishlist = await newWishlist.save();
        res.status(201).json(savedWishlist);
    } catch (err) {
        res.status(500).json({ message: "Error saving wishlist" });
    }
}
const deleteWishlistItemHandler = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const deletedItem = await Wishlist.findOneAndDelete({ hotelId });

        if (!deletedItem) {
            return res.status(404).json({ message: "Wishlist item not found" });
        }

        res.json({ message: "Wishlist item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting wishlist item" });
    }
}
const getWishlistHandler = async(req, res) => {
    try {
        const items = await Wishlist.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: "Error fetching wishlist items" });
    }
}
module.exports = {createWishlistHandler,deleteWishlistItemHandler, getWishlistHandler};