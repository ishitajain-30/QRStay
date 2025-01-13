import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelsController.js";
import { verifyAdmin, verifyToken } from "../middleware/middleware.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, createHotel);

router.put("/:id", verifyToken, verifyAdmin, updateHotel);

router.delete("/:id", verifyToken, verifyAdmin, deleteHotel);

router.get("/:id", verifyToken, getHotel);

router.get("/", verifyToken, getHotels);

export default router;
