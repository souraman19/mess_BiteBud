const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Comment = require("../models/comment");
const Complaint = require("./../models/complaint");
const OTPService = require("./../otpService");




router.get("/patelcomments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/patelcomplaints", async(req, res) => {
  try{
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch(error) {
    console.log("Error in fetching comments", error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

router.post("/addpatelcomments", async(req, res)=>{
  try{
    // Assuming req.body contains the new comment data
    const {_id, name, username, regNo, year, comment, profilePic} = req.body;

    // Create a new Comment document
    const newComment = new Comment({
      _id,
      name,
      username, 
      regNo,
      year,
      comment,
      profilePic,
    });

    // Save the new comment to the database
    await newComment.save();

    res.status(201).json({message: "comment added successfully"});
  }catch(error){
    console.log("Error in saving comment", error);
    res.status(500).json({error: "Internal server error"});
  }
});

router.post("/addpatelcomplaints", async(req, res) => {
  try{
    const {_id, name, username, regNo, year, complaint, commentsOnComplaint, upVoteCount, downVoteCount} = req.body;
    const newComplaint = new Complaint({
      _id,
      name,
      username, 
      regNo, 
      year,
      complaint,
      commentsOnComplaint,
      upVoteCount,
      downVoteCount,
    });
    await newComplaint.save();
    res.status(201).json({message: "complaint added successfully"});
  }catch(error){
    console.log("Error in saving comment", error);
    res.status(500).json({error: "Internal server error"});
  }
})

router.delete("/deletecomment/:id", async(req, res) => {
  try{
    const commentId = req.params.id;
    // console.log("hello", commentId);
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  }catch(error){
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updatecomment/:id", async(req, res) => {
  try{
    const commentId = req.params.id;
    const {comment} = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, {comment}, {new: true});

    if(!updatedComment){
      res.status(404).json({error: "comment not found"});
    }
    res.json(updatedComment);
  }catch(error){
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.put("/upvote/:id", async(req, res)=> {
  const id = req.params.id;
  const myRegNo = req.body.myRegNo;
  // console.log(myRegNo);

  try{
    const findcomplaint = await Complaint.findById(id);
    // console.log("findcom ",findcomplaint);
    if(!findcomplaint){
      return res.status(404).json({error: "Complaint not found"});
    } 

    const isUpVoted = findcomplaint.upVotedMembers.includes(myRegNo);
    // console.log("upvoted ", isUpVoted);
    if(!isUpVoted){
      findcomplaint.upVotedMembers.push(myRegNo);
      findcomplaint.upVoteCount++;
      await findcomplaint.save();
      res.json(findcomplaint);  //send back the updated complaint if needed
    } else {
      return res.status(400).json({error: "User already upvoted this complaint"});
    }
  }catch(error){
    console.error("Errorr in upvoting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/downvote/:id", async(req, res)=> {
  const id = req.params.id;
  const myRegNo = req.body.myRegNo;
  // console.log(myRegNo);

  try{
    const findcomplaint = await Complaint.findById(id);
    // console.log("findcom ",findcomplaint);
    if(!findcomplaint){
      return res.status(404).json({error: "Complaint not found"});
    } 

    const isDownVoted = findcomplaint.downVotedMembers.includes(myRegNo);
    // console.log("upvoted ", isDownVoted);
    if(!isDownVoted){
      findcomplaint.downVotedMembers.push(myRegNo);
      findcomplaint.downVoteCount++;
      await findcomplaint.save();
      res.json(findcomplaint);  //send back the updated complaint if needed
    } else {
      return res.status(400).json({error: "User already upvoted this complaint"});
    }
  }catch(error){
    console.error("Errorr in upvoting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createPassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Update the user's password
      user.password = password;
      // Set registered to 'yes'
      user.registered = "yes";

      await user.save();

      res.json({ success: true, message: "Password created successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
});

router.post("/verifyOTP", async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ otp });

    if (user) {
      console.log("Entered OTP:", otp);
      console.log("Stored OTP:", user.otp);
      // Clear the OTP after successful verification
      user.otp = null;
      await user.save();

      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/validateUser", async (req, res) => {
  const { email, dob } = req.body;

  try {
    const user = await User.findOne({ email, dob });

    if (user) {
      res.json({ success: true, isRegistered: user.registered === "yes" });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false });
  }
});

router.post("/sendOTP", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const otp = OTPService.generateOTP();
      user.otp = otp;
      await user.save();

      OTPService.sendOTP(email, otp);

      res.json({ success: true });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    // Extract user credentials from the request body
    const { email, password } = req.body;

    // Check credentials against the User collection in MongoDB
    const user = await User.findOne({ email, password });

    if (user) {
      // User found, send success along with user's identity
      res.json({ success: true, identity: user.identity });
    } else {
      // User not found, send failure
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
