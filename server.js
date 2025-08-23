const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const hotelDataAddedToDBRouter = require("./routes/dataimport.router");
const categoryDataAddedToDBRouter = require("./routes/categoryimport.router");

const hotelRouter = require("./routes/hotel.router");
const categoryRouter = require("./routes/category.router");
const singleHotelRouter = require("./routes/singlehotel.router");
const authRouter = require("./routes/auth.router");
const wishlistRouter = require("./routes/wishlist.router");
const connectDB = require("./config/dbconfig");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Port setup (Render requires process.env.PORT)
const PORT = process.env.PORT || 3500;

// Health check route
app.get("/", (req, res) => {
  res.send("Hello, World! Server is running ✅");
});

// Routes
app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/hotel", singleHotelRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);

// DB Connection Success
mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
