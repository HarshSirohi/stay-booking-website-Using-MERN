const router = require("express").Router()

const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")

/* GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params
    const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")
    res.status(200).json(trips)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find trips!", error: err.message })
  }
})

/* ADD LISTING TO WISHLIST */


router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (!user.wishList) {
      user.wishList = [];
    }

    const isFavorite = user.wishList.some(
      (item) => item.toString() === listingId
    );

    if (isFavorite) {
      user.wishList = user.wishList.filter(
        (item) => item.toString() !== listingId
      );
    } else {
      user.wishList.push(listingId);
    }

    await user.save();

    // 🔥 IMPORTANT: populate after saving
    const updatedUser = await User.findById(userId)
      .populate("wishList");

    return res.status(200).json({
      message: isFavorite
        ? "Listing removed from wish list"
        : "Listing added to wish list",
      wishList: updatedUser.wishList, // ✅ FULL LISTING OBJECTS
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// getting property

// GET PROPERTY LIST
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all listings created by this user
    const properties = await Listing.find({ creator: userId })
      .populate("creator"); // optional but useful

    return res.status(200).json(properties);
  } catch (err) {
    console.log("Get property list error:", err);
    return res.status(500).json({
      message: "Failed to fetch properties",
      error: err.message,
    });
  }
});


// GET RESERVATION LIST (User Trips)
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;

    const reservations = await Booking.find({
      customerId: userId, // 🔥 important
    })
      .populate("customerId")
      .populate("hostId")
      .populate("listingId");

    return res.status(200).json(reservations);
  } catch (err) {
    console.log("Get reservations error:", err);
    return res.status(500).json({
      message: "Cannot find reservations!",
      error: err.message,
    });
  }
});


// router.patch("/:userId/:listingId", async (req, res) => {
//   try {
//     const { userId, listingId } = req.params;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const listing = await Listing.findById(listingId);
//     if (!listing) {
//       return res.status(404).json({ message: "Listing not found" });
//     }

//     // Ensure wishlist exists
//     if (!user.wishList) {
//       user.wishList = [];
//     }

//     const isFavorite = user.wishList.some(
//       (item) => item.toString() === listingId
//     );

//     if (isFavorite) {
//       user.wishList = user.wishList.filter(
//         (item) => item.toString() !== listingId
//       );

//       await user.save();

//       return res.status(200).json({
//         message: "Listing removed from wish list",
//         wishList: user.wishList,
//       });
//     } else {
//       user.wishList.push(listingId); // ✅ push ID only (NOT full object)

//       await user.save();

//       return res.status(200).json({
//         message: "Listing added to wish list",
//         wishList: user.wishList,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });




// /* GET PROPERTY LIST */
// router.get("/:userId/properties", async (req, res) => {
//   try {
//     const { userId } = req.params
//     const properties = await Listing.find({ creator: userId }).populate("creator")
//     res.status(202).json(properties)
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({ message: "Can not find properties!", error: err.message })
//   }
// })

// /* GET RESERVATION LIST */
// router.get("/:userId/reservations", async (req, res) => {
//   try {
//     const { userId } = req.params
//     const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId")
//     res.status(202).json(reservations)
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({ message: "Can not find reservations!", error: err.message })
//   }
// })


module.exports = router



