import mongoose from "mongoose";
import {USer} from "../person/User.js";

const chatMessageSchema = new mongoose.Schema({
    messageId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Schema.Types.ObjectId(),
        required: true,
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    messageType:{
        type: String,
        required: true,
        enum: ["Text", "Audio", "Image"],
    },
    status:{
        type: String,
        enum:["Sending pending", "Sent", "Received", "Read", "File", "Sticker"],
        default: "Sending Pending",
    },
    message:{
      type: String,
      required: function () {
        return this.messageType === 'Text' 
      }, 
    },
    fileUrl:{
        type: String,
        required: function () {
            return this.messageType === 'File' || this.messageType === 'Audio' || this.messageType === 'Image'; // Required for File, Audio, and Image
        },
    },
    stickerUrl:{
        type: String,
        required: function () {
            return this.messageType === 'Sticker'; // Required if the message type is Sticker
        },
    },
    time:{
        sentAt:{
            type: Date,
            required: true,
            default: Date.now,
        },
        receivedAt:{
            type: Date,
            default: null,
        },
        seenAt:{
            type: Date,
            default: null,
        }
    },
    messageSize:{
        size:{type: Number, required: true},
        unit:{type: String, required: true, enum:["KB", "MB"]}
    }
}, {timestamps: true})

const ChatMessage = new mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;