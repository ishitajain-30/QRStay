import bcrypt from "bcryptjs";
import User from "../models/users.js";
import Hotel from "../models/hotels.js";

export const createHotel = async (req, res) => {
  try {
    const { name, logo, address, guestAdminData } = req.body;

    // Create guest admin user
    const hashedPassword = await bcrypt.hash(guestAdminData.password, 10);
    const guestAdmin = new User({
      username: guestAdminData.username,
      email: guestAdminData.email,
      password: hashedPassword,
      role: "guest_admin",
    });
    await guestAdmin.save();

    // Create hotel
    const hotel = new Hotel({
      name,
      logo,
      address,
      guestAdminID: guestAdmin._id,
    });
    await hotel.save();

    res
      .status(201)
      .json({ message: "Hotel and guest admin created successfully", hotel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const hotel = await Hotel.findByIdAndUpdate(id, updates, { new: true });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Delete associated guest admin
    await User.findByIdAndDelete(hotel.guestAdminID);
    await Hotel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Hotel and guest admin deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id).populate(
      "guestAdminID",
      "username email"
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.log({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate(
      "guestAdminID",
      "username email"
    );
    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
