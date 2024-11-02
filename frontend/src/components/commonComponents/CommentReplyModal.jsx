import React, { useState, useEffect } from "react";
import "./../../styles/CommentReplyModal.css"; 
import { useUser } from "../../UserContext";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";
import {ADD_COMMENT_UNDER_COMMENT_ROUTE, DELETE_COMMENT_UNDER_COMMENT_ROUTE, GET_COMMENTS_UNDER_COMMENT_ROUTE} from "./../../utils/ApiRoutes.js";

//onAddComment
function CommentModal({ onClose, commentId}) {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  const myUserId = userInfo.userId;
  const myUsername = userInfo.username;
  const myRegNo = userInfo.regNo;
  const myHostel = userInfo.hostel;
  const myFirstName = userInfo.firstName;
  const myYear = userInfo.year;
  const myProfilePicture = userInfo.profilePicture;


  const [singleComment, setSingleComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [myAllComments, setMyAllComments] = useState([]);
  const [otherAllComments, setOtherAllComments] = useState([]);


  useEffect(() => {
    try{
      const fetchData = async() => {
        const response = await axios.get(`${GET_COMMENTS_UNDER_COMMENT_ROUTE}/${commentId}`);
        // console.log("ioabd =>  ", response.data.commentsOnComplaint);
        const allCommentsOfComment = response.data.commentsUnderComment;
        const myCommentsOfComment = allCommentsOfComment.filter((comment) =>  comment.commentedBy.userId === myUserId  );
        const otherCommentsOfComment = allCommentsOfComment.filter((comment) => comment.commentedBy.userId !== myUserId  );
        setAllComments(allCommentsOfComment);
        setMyAllComments(myCommentsOfComment);
        setOtherAllComments(otherCommentsOfComment);
      };
      fetchData();
    }catch(error){
      console.error("Error in fetching comments", error);
    }
  }, [myAllComments, otherAllComments, allComments]);


  const handleCommentChange = (event) => {
    setSingleComment(event.target.value);
  };

  const handleCommentSubmit = async() => {
    const currentTime = new Date();
    if (singleComment.trim() !== "") {
      const _id = uuidv4();
      const newComment = {
        commentedBy: {
            username: myUsername,
            userId: myUserId
        },
        comment: singleComment,
      };


      try{
        const response = await axios.post(`${ADD_COMMENT_UNDER_COMMENT_ROUTE}/${commentId}`, newComment);
        // setAllComments([...allComments, newComment]);
        setSingleComment("");
        const allCommentsOfComment = response.data.commentsOnComment;
        const myCommentsOfComment = allCommentsOfComment.filter((comment) =>  comment.commentedBy.userId === myUserId );
        const otherCommentsOfComment = allCommentsOfComment.filter((comment) =>   comment.commentedBy.userId !== myUserId  );
        setAllComments(allCommentsOfComment);
        setMyAllComments(myCommentsOfComment);
        setOtherAllComments(otherCommentsOfComment);
        console.log("Comment added successfully");
      }catch(error){
        console.log("Error in adding new comment", error);
      }
    }
  };

  async function handleDeleteComment(reCommentId) {
    try{
      console.log("kkdshv");
      // console.log(commentId);
      // console.log(complId);
      const response = await axios.post(`${DELETE_COMMENT_UNDER_COMMENT_ROUTE}`, {originalCommentId: commentId, commentId: reCommentId});
      console.log("Comment deleted successfully");
      console.log(response.data.updatedComment.commentsOnComment);
      const allCommentsOfComment = response.data.updatedComment.commentsOnComment;
        const myCommentsOfComment = allCommentsOfComment.filter((comment) =>  comment.commentedBy.userId === myUserId);
        setAllComments(allCommentsOfComment);
        setMyAllComments(myCommentsOfComment);
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
          {
              myAllComments.length > 0 && <h2>
                My Comments
              </h2>
          }
          <ul>
            <div className="outer-owncomments89376273">
              {myAllComments.map((singleComment, index) => (
                <div className="owncomments89376273" key={index}>
                  <li>{singleComment.comment}</li>
                  <span className="comment-info">{singleComment.commentedBy.username} • {singleComment.commentTime}</span>
                  <button onClick={() => handleDeleteComment(singleComment.commentId)}>
                    <div style={{marginLeft:"32rem", display:"flex", gap:"2rem"}}>
                    <EditIcon />
                    <DeleteIcon />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </ul>
          {
              otherAllComments.length > 0 && <h2>
                Other Comments
              </h2>
            }
          <ul>
            <div className="outer-owncomments89376273">
              {otherAllComments.map((singleComment, index) => (
                <div className="owncomments89376273" key={index}>
                  <li>{singleComment.comment}</li>
                  <span className="comment-info">{singleComment.commentedBy.username} • {singleComment.commentTime}</span>
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
        <button className="post_button" onClick={handleCommentSubmit}>Post</button>
      </div>
    </div>
  );
}

export default CommentModal;
