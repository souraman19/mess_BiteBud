import mongoose from "mongoose";
import {User} from "../person/User.js";
import MenuItem from "./../mess_menu/MenuItem.js";

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

const menuItemRatingBucketSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MenuItem'
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
const MenuItemRatingBucket = new mongoose.model('MenuItemRatingBucket', menuItemRatingBucketSchema);
export default MenuItemRatingBucket;  



