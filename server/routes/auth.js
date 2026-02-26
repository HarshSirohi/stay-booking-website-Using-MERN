const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const streamifier = require("streamifier");

const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");

const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "dream_nest/users" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

      
    try {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      return res.status(500).json({
        message: "Cloudinary upload failed",
        error: err.message,
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath: cloudinaryResult.secure_url,
    });

    await newUser.save();

    res.status(200).json({
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed!",
      error: err.message,
    });
  }
});

/* USER LOGIN*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({ token, user: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
