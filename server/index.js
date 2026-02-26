const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary");
const dbConnection = require("./database/dbConnection");
require("dotenv").config()


const app = express();


const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/booking");
const userRoutes = require("./routes/user");


app.use(express.json())
app.use(cors())


// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3001;

dbConnection();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
