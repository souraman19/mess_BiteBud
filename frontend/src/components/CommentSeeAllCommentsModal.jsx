import React, { useState, useEffect } from "react";
import "./../styles/CommentSeeAllCommentsModal.css"; 
import { useUser } from "../UserContext";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


function CommentModal({ onClose, complaintId, commentsOnComplaint, onAddComment}) {
  const {user, updateUser} = useUser();
  const name = user.name;
  const username = user.username;
  const regNo = user.regNo;
  const year = user.year;
  const profilePic = user.profilePic;


  const [singleComment, setSingleComment] = useState("");
  const [allComments, setAllComments] = useState(commentsOnComplaint);

  useEffect(() => {
    try{
      const fetchData = async() => {
        const response = await axios.get(`http://localhost:5000/api/commentsofcomplaint/${complaintId}`);
        console.log("ioabd =>  ", response.data.commentsOnComplaint);
        setAllComments(response.data.commentsOnComplaint);
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
        name: name,
        username: username,
        regNo: regNo, 
        year: year,
        comment: singleComment,
        time: currentTime,
      };

      try{
        const response = await axios.post(`http://localhost:5000/api/addcommentsofcomplaint/${complaintId}`, newComment);
        setAllComments([...allComments, newComment]);
        setSingleComment("");
        setAllComments(response.data.commentsOnComplaint);
        console.log("Comment added successfully");
      }catch(error){
        console.log("Error in adding new comment", error);
      }
    }
  };




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
          <h2>All Comments</h2>
          <ul>
            <div className="outer-owncomments89376273">
              {allComments.map((singleComment, index) => (
                <div className="owncomments89376273" key={index}>
                  <li>{singleComment.comment}</li>
                  <span className="comment-info">{singleComment.name} • {singleComment.time}</span>
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
