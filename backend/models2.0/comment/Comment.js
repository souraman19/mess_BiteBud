import mongoose from "mongoose";
import {Student, User} from "./../person/User.js";

const commentUnderCommentSchema = mongoose.Schema({
        comment: {type: String, required: true},
        commentTime: {type: Date, default: Date.now},
        commentedBy: {
            name:{type: String, required: true},
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}
        },
        isDeleted: { type: Boolean, default: false },
}, {timestamps: {createdAt: true, updatedAt: true}})


const reactionUnderCommentSchema = mongoose.Schema({
        reaction: {type: String, required: true},
        reactionTime: {type: Date, default: Date.now},
        reactedBy: {
            name:{type: String, required: true},
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}
        },
        isDeleted: { type: Boolean, default: false },
}, {timestamps: {createdAt: true, updatedAt: true}});

const commentSchema = new mongoose.Schema({
    commentId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
    },
    commentText: {
        type: String,
        default: ""
    },
    commentImages:{
        type:[{
            type: String,
            default:""
        }],
        default:[]
    },
    commentAudio: {
        type: String,
        default: "",
    },
    commentedBy: {
        name: {
            type: String, required: true
        },
        profilePicture:{
            type: String, required: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },
    },
    commentTime:{
        type: Date,
        default: Date.now
    }, 
    commentsUnderComment: {
        type:[commentUnderCommentSchema],
        default:[],
    },
    reactionsUnderComment: {
        type: [reactionUnderCommentSchema],
        default:[],
    },
    isDeleted: { type: Boolean, default: false },
    reactionsCount:{type: Number, default: 0},
    commentsUnderCommentCount: {type: Number, default: 0},
}, {timestamps: {createdAt: true, updatedAt: true}})

const Comment = new mongoose.model('Comment', commentSchema);
export default Comment;