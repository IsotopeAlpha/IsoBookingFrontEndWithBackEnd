import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";


const saltRounds = 10;

cloudinary.v2.config({
    cloud_name: "dsybyyi1n",
    api_key: "728234898474631",
    api_secret: "Xh3iwcfo-HiJw7nY4ttrca-dZ1M",
    secure: true
})

console.log(cloudinary.config());

export const register = async (req, res, next) => {
    let imageUrl = "";
    let imageId = ""

    try {
        if (req.body.image) {
            await cloudinary.v2.uploader
                .upload(req.body.image,{
                    folder: 'booking'
                })
                .then((res) => {
                    imageUrl = res.url
                    imageId = res.public_id
                })
                .catch((error) => {
                    console.log(`upload error: ${error.message}`);
                    return res.status(400).json({
                        message: 'Error uploading image, try again',
                        data: null
                    })
                });
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            imageUrl: imageUrl,
            imageId: imageId,
            password: hash,
        });

        await newUser.save();
        res.status(200).json({status:"ok", msg:"User has been created"});
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(404).json({msg: "User not found"});

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) { return res.status(404).json({msg:"Password is not correct"}); }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ msg:"User created successfully", details: { ...otherDetails }, isAdmin });
    } catch (err) {
        console.log(err)
        next(err);
    }
} 