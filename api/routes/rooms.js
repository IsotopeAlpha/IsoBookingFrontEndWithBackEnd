import express from "express";
import { createRoom, deleteRoom, getRoom, updateRoom, updateRoomAvailabilty } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verfyToken.js";

const router = express.Router();

router.post("/:hotelId", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id",  updateRoomAvailabilty);

router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
 
router.get("/:id", getRoom);

router.get("/", getRoom);

export default router;