import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: "dsybyyi1n",
    api_key: "728234898474631",
    api_secret: "Xh3iwcfo-HiJw7nY4ttrca-dZ1M",
    secure: true
})

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;

    try {
        const hotels = await Hotel.find({ ...others, cheapeastPrice: { $gt: min || 1, $lt: max || 999 } }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}
export const getCountByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}
export const getCountByType = async (req, res, next) => {
    const types = req.query.types.split(',')
    try {
        const list = await Promise.all(types.map(type => {
            return Hotel.countDocuments({ type: type })
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}
export const getHostelByName = async (req, res, next) => {
    try {
        const foundHotel = await Hotel.find({ name: { $regex: '/' + req.params.name + '/' } }).limit(5);
        res.status(200).json(foundHotel);
    } catch (err) {

        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const uploadImages = async (req, res, next) => {
    let photos = [];
    let imageIds = [];
    const { images } = req.body
    try {
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                await cloudinary.v2.uploader
                    .upload(images[i], {
                        folder: 'booking'
                    })
                    .then((res) => {
                        photos.push(res.url)
                        imageIds.push(res.public_id)
                    })
                    .catch((error) => {
                        console.log(`upload error: ${error.message}`);
                        return res.status(400).json({
                            message: 'Error uploading image, try again',
                            data: null
                        })
                    });

            }
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: { "photos": photos, "imageIds": imageIds } }, { new: true });
            res.status(200).json({ msg: "Upload sucessful", data: updatedHotel });
        } else {
            res.status(200).json({ msg: "No Image to Upload" });
        }

    } catch (error) {
        console.log(err)
        next(err);
    }
}

