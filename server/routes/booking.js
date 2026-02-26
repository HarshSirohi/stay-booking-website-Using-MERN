// const router = require("express").Router()

// const Booking = require("../models/Booking")

// /* CREATE BOOKING */
// router.post("/create", async (req, res) => {
//   try {
//     const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
//     const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice })
//     await newBooking.save()
//     res.status(200).json(newBooking)
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
//   }
// })

// module.exports = router


const router = require("express").Router();
const Booking = require("../models/Booking");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const {
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    } = req.body;

    if (!customerId || !hostId || !listingId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });

    await newBooking.save();

    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Fail to create a new Booking!",
      error: err.message,
    });
  }
});

module.exports = router;