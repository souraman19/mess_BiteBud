import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo"; 

dotenv.config({path: './../.env'});
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
// app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', // Set to your client-side URL
    credentials: true,               // Allow cookies to be included in requests
};
app.use(cors(corsOptions));

//session initialize
app.use(session({
    secret: process.env.TOPSECRETKEY || "TOPSECRETKEY",
    resave: false, //ensures the session isn't saved to the store if it wasn't modified.
    saveUninitialized: false, //Sessions won't be saved unless they’re modified,
    store: MongoStore.create({ //Configures MongoDB to store sessions, so they persist across server restarts
        mongoUrl: process.env.MONGO_URI2, // check Mongo URI accuracy
        collectionName: 'sessions',
        ttl: 5 * 60, //  session expiration in seconds (5 minutes)
    }),
    cookie: {
        maxAge: 5 * 60 * 1000, // 5 minutes
        sameSite: "lax", // "lax" allows cross-site requests only for GET
        secure: false //et to false here for development (over HTTP). For production (HTTPS), this should be true to enhance security.
    }
}));

const connectdb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI2);
        console.log("Connected");
    }catch(err){
        console.log(err);
        process.exit(1); // Exit if connection fails

    }
}
connectdb();

export default app;