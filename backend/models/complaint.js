const mongoose = require("mongoose");

const complaintschema = new mongoose.Schema({
    _id:{type: String, required: true},
    time: {type: Date, default: Date.now},
    name:{type: String},
    username:{type: String},
    regNo:{type: String},
    year:{type: String},
    complaintTitle:{type: String},
    complaint:{type: String},
    hostel:{type: String},
    commentsOnComplaint:{type:Array},
    upVoteCount:{type: Number},
    downVoteCount:{type: Number},
    upVotedMembers:{type: Array},
    downVotedMembers:{type: Array},
    isResolved:{type: Boolean, default: false},
    resolvedBy:{type: String, default: ""},
    resolvedTime: {type: Date, default: Date.now},
    resolvedMessage: {type: String, default: ""},
});

const Complaint = mongoose.model('Complaint', complaintschema);

module.exports = Complaint;
