import mongoose from "mongoose";
import {User} from "../person/User.js";
import MessMenuPerSlot from "./MessMenuPerSlot.js";

const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5, 
    },
    comment: {
        type: String,
        default: null, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const messMenuPerSlotRatingBucketSchema = new mongoose.Schema({
    mealId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MessMenuPerSlot', 
    },
    bucketId: {
        type: Number,
        required: true,
        unique: true
    },
    ratings:{
        type:[ratingSchema],
        default:[]
    },
    ratingsCount:{
        type: Number,
        default: 0
    },
}, {timestamps: true});
const MessMenuPerSlotRatingBucket = new mongoose.model('MessMenuPerSlotRatingBucket', messMenuPerSlotRatingBucketSchema);
export default MessMenuPerSlotRatingBucket;  



