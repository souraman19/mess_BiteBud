import Comment from "./../models2.0/comment/Comment.js";


const getAllComments = async(req, res) => {
    try{
        const hostel = req.query.hostel;
        console.log(req.query);
        const comments = await Comment.find({"commentedBy.hostel": hostel});
        console.log("mycom",comments);
        return res.status(200).json({comments: comments});
    }catch(err){
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const addComment = async(req, res) => {
    const newComment = req.body;
    console.log("new =>>>>", newComment);   
    try{
        const newMyComment = new Comment(newComment);
      
          // Save the new comment to the database
          await newMyComment.save();
          const comments = await Comment.find();
          res.status(201).json({comments: comments, message: "comment added successfully"});

    }catch(error){
        console.log("Error in saving comment", error);
        res.status(500).json({error: "Internal server error"});
    }
}



//for editi
const editComment = async(req, res)=> {
    try{
        const commentId = req.params.commentId;
        const commentText = req.body.commentText;

        // console.log("comId", commentId);
        // console.log("com", commentText);    
    
        const updatedComment = await Comment.findOneAndUpdate({commentId: commentId}, {commentText: commentText}, {new: true});
        console.log(updatedComment);
        if(!updatedComment){
          return res.status(404).json({error: "comment not found"});
        }
        return res.json(updatedComment);
      }catch(error){
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const deleteComment = async(req, res) => {
    try{
        const commentId = req.params.commentId;
        console.log("hello", commentId);
        await Comment.findOneAndDelete({commentId: commentId});
        res.json({ message: "Comment deleted successfully" });
      }catch(error){
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}


const addCommentUnderComment = async(req, res) => {
    const commentId = req.params.commentId;
    const newComment = req.body;
    try{
        const findComment = await Comment.findOne({commentId: commentId});
        // console.log(findComment);
      if(!findComment) {
        return res.status(404).json({error: "Comment not found"});
      }
      findComment.commentsUnderComment.unshift(newComment);
      await findComment.save();
      res.json(findComment);
    } catch(error){
      console.log("Error in getting comments on complaint", error);
      res.status(500).json({error: "Internal server error"});
    }
}

const getCommentsUnderComment = async(req, res) => {
    const commentId = req.params.commentId;
    try{
      const findComment = await Comment.findOne({commentId: commentId});
      if(!findComment) {
        return res.status(404).json({error: "Complaint not found"});
      }
      res.json(findComment);
    }catch(error){
      console.log("Error in getting comments on complaint", error);
      res.status(500).json({error: "Internal server error"});
    }
}

const deleteCommentUnderComment = async(req, res) => {
    const commentId = req.body.commentId;
    const originalCommentId = req.body.originalCommentId;
    console.log(commentId);
    console.log(originalCommentId);
    try{
      const updatedComment = await Comment.findOneAndUpdate({commentId: originalCommentId}, {$pull: {commentsUnderComment: {commentId: commentId}}});
      console.log("deleted comment ", updatedComment);
      res.status(200).json({ message: "Comment replaced successfully", updatedComment: updatedComment });
    }catch(error){
      console.log("Error in deleting comments of complaint", error);
      res.status(500).json({error: "Internal server error"});
    }
}


export {getAllComments, addComment, editComment, deleteComment, addCommentUnderComment, getCommentsUnderComment, deleteCommentUnderComment };