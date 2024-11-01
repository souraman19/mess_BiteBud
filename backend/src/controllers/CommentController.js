import Comment from "./../models2.0/comment/Comment.js";


const getAllComments = async(req, res) => {
    try{
        const hostel = req.query.hostel;
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


export {getAllComments, addComment};