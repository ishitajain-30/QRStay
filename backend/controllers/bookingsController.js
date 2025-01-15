import Bookings from "../models/bookings.js";
import hotels from "../models/hotels.js";

export const createBooking = async (req, res) => {
  try {
    const booking = new Bookings({
      ...req.body,
      userId: req.user.id,
      status: "pending",
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const booking = await Bookings.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user has permission to update
    if (req.user.role === "user" && booking.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this booking" });
    }

    const updatedBooking = await Bookings.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    // If guest admin, only return Bookings for their hotel
    if (req.user.role === "guest_admin") {
      const hotel = await hotels.findOne({ guestAdminID: req.user.id });

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const booking = await Bookings.find({ hotelId: hotel._id }).populate(
        "userId",
        "username email"
      );
      // console.log("Bookings:", booking);

      return res.status(200).json(booking);
    }

    // If admin, return all Bookings
    if (req.user.role === "main_admin") {
      const booking = await Bookings.find().populate(
        "userId",
        "username email"
      );
      return res.status(200).json(booking);
    }

    // If user, return only their Bookings
    const booking = await Bookings.find({ userId: req.user.id });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
