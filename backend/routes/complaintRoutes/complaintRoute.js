const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Comment = require("../models/comment");
const Complaint = require("./../models/complaint");
const Image = require("./../models/image");
const Expense = require("./../models/expense");
const OTPService = require("./../otpService");
const MessMenu = require("./../models/messMenu");


// for resolving complaint
router.patch("/resolvecomplaint/:complaintId", async(req, res) => {
    try{
        const updatedData = req.body;
        const complaintId = req.params.complaintId;

        const foundUser = await Complaint.findByIdAndUpdate(complaintId, updatedData, {new: true});
        if(!foundUser) res.status(400).send({error: 'User not found'});
        res.status(200).json({foundUser});

    }catch(err){
        console.error("Error in resolving complaint", err);
        res.status(500).json({message: "INternal server error"});
    }
})