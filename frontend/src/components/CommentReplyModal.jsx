import React, { useState, useEffect } from "react";
import "./../styles/CommentReplyModal.css"; 
import { useUser } from "../UserContext";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';


function CommentModal({ onClose, complaintId, commentsOnComplaint, onAddComment}) {
  const {user, updateUser} = useUser();
  const myName = user.name;
  const myUsername = user.username;
  const myRegNo = user ? user.regNo : '';
  const myYear = user.year;
  const myProfilePic = user.profilePic;


  const [singleComment, setSingleComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    try{
      const fetchData = async() => {
        const response = await axios.get(`http://localhost:5000/api/commentsofcomplaint/${complaintId}`);
        // console.log("ioabd =>  ", response.data.commentsOnComplaint);
        const allCommentsOfComplaint = response.data.commentsOnComplaint;
        const myCommentsOfComplaint = allCommentsOfComplaint.filter((comment) => {return comment.regNo === myRegNo} );
        setAllComments(myCommentsOfComplaint);
      };
      fetchData();
    }catch(error){
      console.error("Error in fetching comments", error);
    }
  }, []);


  const handleCommentChange = (event) => {
    setSingleComment(event.target.value);
  };

  const handleCommenttSubmit = async() => {
    const currentTime = new Date();
    if (singleComment.trim() !== "") {
      const _id = uuidv4();
      const newComment = {
        _id : _id,
        name: myName,
        username: myUsername,
        regNo: myRegNo, 
        year: myYear,
        comment: singleComment,
        time: currentTime,
      };

      try{
        const response = await axios.post(`http://localhost:5000/api/addcommentsofcomplaint/${complaintId}`, newComment);
        // setAllComments([...allComments, newComment]);
        setSingleComment("");
        setAllComments(response.data.commentsOnComplaint);
        console.log("Comment added successfully");
      }catch(error){
        console.log("Error in adding new comment", error);
      }
    }
  };

  async function handleDeleteComment(commentId) {
    try{
      console.log("kkdshv");
      console.log(commentId);
      console.log(complaintId);
      const response = await axios.post(`http://localhost:5000/api/deletecommentofcomplaint`, {complaintId: complaintId, commentId: commentId});
      console.log("Comment deleted successfully");
    }catch(error){
      console.log("Error in deleting comments", error);
    }
  }




  // const handlePostComment = () => {
  //   if (commentText.trim() !== "") {
  //     onAddComment({ text: commentText, name: "Anonymous", time: getTimeAgo() });
  //     setCommentText("");
  //   }
  // };

  // const getTimeAgo = () => {
  //   // Logic to calculate time ago, you can use libraries like moment.js for more precise time formatting
  //   return "5 minutes ago"; // Placeholder, replace with actual time calculation
  // };

  return (
    <div className="comment-modal-overlay">
      <div className="comment-modal">
        <button type="button" className="btn custom-btn-light btn-lg" onClick={onClose}>
          <span>&times;</span>
        </button>
        <div className="existing-comments">
          <h2>My Comments</h2>
          <ul>
            <div className="outer-owncomments89376273">
              {allComments.map((singleComment, index) => (
                <div className="owncomments89376273" key={index}>
                  <li>{singleComment.comment}</li>
                  <span className="comment-info">{singleComment.name} • {singleComment.time}</span>
                  <button onClick={() => handleDeleteComment(singleComment._id)}>
                    <DeleteIcon style={{marginLeft:"35rem"}}/>
                  </button>
                </div>
              ))}
            </div>
          </ul>
        </div>
        <textarea
          placeholder="Write your comment here..."
          value={singleComment}
          onChange={handleCommentChange}
        />
        <button className="post_button" onClick={handleCommenttSubmit}>Post</button>
      </div>
    </div>
  );
}

export default CommentModal;
