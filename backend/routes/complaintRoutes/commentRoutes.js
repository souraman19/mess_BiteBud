const express = require('express');
const router = express.Router();
const User = require("../../models/user");
const Comment = require("../../models/comment");
const Complaint = require("./../../models/complaint");
const Image = require("./../../models/image");
const Expense = require("./../../models/expense");
const OTPService = require("./../../otpService");
const MessMenu = require("./../../models/messMenu");

  ?????????????????????????????//reanme it to >>>>>>>>>


router.get("/commentsofcomment/:commentId", async(req, res) => {
    const commentId = req.params.commentId;
    try{
      const findComment = await Comment.findById(commentId);
      if(!findComment) {
        return res.status(404).json({error: "Complaint not found"});
      }
      res.json(findComment);
    }catch(error){
      console.log("Error in getting comments on complaint", error);
      res.status(500).json({error: "Internal server error"});
    }
  });


  router.post("/addcommentsofcomment/:commentId", async(req, res) => {
    const commentId = req.params.commentId;
    const newComment = req.body;
    try{
        const findComment = await Comment.findById(commentId);
        // console.log(findComment);
      if(!findComment) {
        return res.status(404).json({error: "Comment not found"});
      }
      findComment.commentsOnComment.unshift(newComment);
      await findComment.save();
      res.json(findComment);
    } catch(error){
      console.log("Error in getting comments on complaint", error);
      res.status(500).json({error: "Internal server error"});
    }
  
  })


  router.post("/deletecommentofcomment", async(req, res) => {
    const commentId = req.body.commentId;
    const originalCommentId = req.body.originalCommentId;
    // console.log(commentId);
    // console.log(originalCommentId);
    try{
      let findComment = await Comment.findById(originalCommentId);
      if(!findComment) {
        return res.status(404).json({error: "Complaint not found"});
      }
  
      let updatedComment = findComment.commentsOnComment.filter(comment => {
        if(comment._id !== commentId)
        return comment;
      });
      findComment.commentsOnComment = updatedComment;
      updatedComment = await findComment.save();
      console.log("Comment of complaint deleted successfullly");
      res.status(200).json({ message: "Comment replaced successfully", updatedComment: updatedComment });
    }catch(error){
      console.log("Error in deleting comments of complaint", error);
      res.status(500).json({error: "Internal server error"});
    }
  });


module.exports = router;