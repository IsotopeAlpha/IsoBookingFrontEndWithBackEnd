import express from "express";
import { createHotel, deleteHotel, getCountByType, getCountByCity, getHotel, getHotels, updateHotel, getHotelRooms, getHostelByName, uploadImages } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verfyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/find/:id", getHotel);

router.get("/", getHotels);
router.get("/countByCity", getCountByCity);
router.get("/countByType", getCountByType);
router.get("/room/:id", getHotelRooms);
router.get("/name/:name", getHostelByName);
router.put("/upload/:id", uploadImages);

export default router;