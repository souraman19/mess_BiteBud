import mongoose from "mongoose";
import {Student} from "../person/User.js";

const reactionUnderImageSchema = mongoose.Schema({
    reaction: {type: String, required: true},
    reactionTime: {type: Date, default: Date.now},
    reactedBy: {
        name:{type: String, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}
    },
    isDeleted: { type: Boolean, default: false },
}, {timestamps: {createdAt: true, updatedAt: true}});

const galleryItemSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
    },
    hostel: {
        type: String,
        required: true,
    },
    uploadedBy: {
        name: {type: String, required: true},
        username: {type: String, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student'}
    },
    uploadTime: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    ractions:{
        type:[reactionUnderImageSchema],
        default: []
    },
    reactionCount: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }

}, {timestamps: {createdAt: true, updatedAt: true}});

const GalleryItem = new mongoose.model('GalleryItem', galleryItemSchema);

export default GalleryItem;