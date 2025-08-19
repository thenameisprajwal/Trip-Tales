const Category = require('../model/category.model');
const categoryHandler = async (req, res) => {
    try {
            const categories = await Category.find({});
            res.json(categories);
        } catch (err) {
            res.status(404).json({ message: "Error fetching categories" });
        }
    }
module.exports = categoryHandler;