// backend/models/comment.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String},
  username: {type: String},
  regNo: {type: String},
  year:{type: String},
  comment: { type: String},
  hostel:{type: String},
  profilePic: {type: String},
  commentsOnComment: {type: Array},
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
