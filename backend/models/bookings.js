import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobileNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    purposeofVisit: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    email: {
      type: String,
    },
    idProofNumber: {
      type: String,
    },
    status: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    hotelId: {
      type: mongoose.Types.ObjectId,
      ref: "Hotel",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
