const mongoose = require("mongoose");

const complaintschema = new mongoose.Schema({
    _id:{type: String, required: true},
    name:{type: String},
    username:{type: String},
    regNo:{type: String},
    year:{type: String},
    complaint:{type: String},
    commentsOnComplaint:{type:Array},
    upVoteCount:{type: Number},
    downVoteCount:{type: Number},
    upVotedMembers:{type: Array},
    downVotedMembers:{type: Array},
    isResolved:{type: Boolean, default: false},
});

const Complaint = mongoose.model('Complaint', complaintschema);

module.exports = Complaint;
