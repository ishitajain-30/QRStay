import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
} from "../controllers/bookingsController.js";
import { verifyGuestAdmin, verifyToken } from "../middleware/middleware.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.put("/:id", verifyToken, verifyGuestAdmin, updateBooking);
router.get("/", verifyToken, verifyGuestAdmin, getBookings);

export default router;
