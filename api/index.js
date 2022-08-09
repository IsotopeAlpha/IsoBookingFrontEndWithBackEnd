import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "../api/routes/auth.js";
import usersRoute from "../api/routes/users.js";
import hotelsRoute from "../api/routes/hotels.js";
import roomsRoute from "../api/routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
dotenv.config();


const connect = async()=>{
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB")
  } catch (error) {
      throw error;
  }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected");
});

connect();


//middlewares
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors())


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.listen(8000, ()=>{
    console.log("Connected to sever on port: 8000")
})