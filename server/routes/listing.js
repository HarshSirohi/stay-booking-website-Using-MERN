const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const Listing = require("../models/Listing");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos || listingPhotos.length === 0) {
      return res.status(400).json({ message: "No photos uploaded" });
    }

    let amenitiesArray = [];
    try {
      amenitiesArray = JSON.parse(amenities);
    } catch (err) {
      amenitiesArray = [];
    }

    const uploadedPhotoUrls = [];

    for (const file of listingPhotos) {
      const base64 = file.buffer.toString("base64");
      const dataUri = `data:${file.mimetype};base64,${base64}`;

      const uploaded = await cloudinary.uploader.upload(dataUri, {
        folder: "listings",
      });

      uploadedPhotoUrls.push(uploaded.secure_url);
    }

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities: amenitiesArray,
      listingPhotoPaths: uploadedPhotoUrls,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();

    res.status(201).json(newListing);
  } catch (err) {
    res.status(409).json({
      message: "Fail to create Listing",
      error: err.message,
    });
  }
});

// router.get("/", async (req, res) => {
//   const qCategory = req.query.category;

//   try {
//     let listings;

//     if (qCategory) {
//       listings = await Listing.find({ category: qCategory }).populate("creator");
//     } else {
//       listings = await Listing.find().populate("creator");
//     }

//     res.status(200).json(listings);
//   } catch (err) {
//     res.status(404).json({
//       message: "Fail to fetch listings",
//       error: err.message,
//     });
//   }
// });


router.get("/", async (req, res) => {
  const { category } = req.query;
    // console.log("Requested category:", category); 

  try {
    let listings;

    if (category) {
      listings = await Listing.find({
        category: { $regex: category, $options: "i" }
      }).populate("creator");
      // console.log("Listings found:", listings.length)
    } else {
      listings = await Listing.find().populate("creator");
    }

    return res.status(200).json(listings);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch listings",
      error: err.message,
    });
  }
});




/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params

  try {
    let listings = []

    if (search === "all") {
      listings = await Listing.find().populate("creator")
    } else {
      listings = await Listing.find({
        $or: [
          { category: {$regex: search, $options: "i" } },
          { title: {$regex: search, $options: "i" } },
        ]
      }).populate("creator")
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
})


// listingdeatils
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params
    const listing = await Listing.findById(listingId).populate("creator")

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" })
    }

    res.status(200).json(listing)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
});

module.exports = router;
