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

app.use(express.json());
connectDB();

const PORT = 3500;

app.get("/", (req, res) => {
    res.send("Hello, World!")
    })

app.use("/api/hoteldata", hotelDataAddedToDBRouter )
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/hotel", singleHotelRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
})

app.listen(process.env.PORT || PORT,  () => {
    console.log("Server is up and running")
})