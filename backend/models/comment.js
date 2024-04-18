// backend/models/comment.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String},
  username: {type: String},
  regNo: {type: String},
  year:{type: String},
  comment: { type: String},
  // Add other fields as needed
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
