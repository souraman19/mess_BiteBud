import React, { useState, useEffect } from "react";
import Navbar from "../../components/commonComponents/Navbar";
import CommentSegmentSlide from "../../components/commonComponents/CommentSegmentSlide";
import "./../../styles/MyAllCommentsPage.css";
import axios from "axios";
import { useStateProvider } from "../../context/StateContext";
import { Link } from "react-router-dom";
import { ADD_COMMENT_ROUTE, GET_ALL_COMMENTS_ROUTE } from "./../../utils/ApiRoutes";
import { format, differenceInDays, parseISO } from "date-fns";

const formatTime = (time) => {
  const parsedTime = new Date(time);
  const timeSinceCreated = new Date() - new Date(time);
  if(timeSinceCreated < 24 * 60 * 60 * 1000){ // less than 24 hours
    return parsedTime.toLocaleTimeString();
  } else {
    return parsedTime.toDateString() + " " + parsedTime.toLocaleTimeString();
  }
};

function Commentlist() {
  const [{ userInfo }] = useStateProvider();

  const userId = userInfo.userId;
  const username = userInfo.username;
  const firstName = userInfo.firstName;
  const profilePicture = userInfo.profilePicture;
  const hostel = userInfo.hostel;

  const [singleComment, setSingleComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(GET_ALL_COMMENTS_ROUTE, {
        params: { hostel },
        withCredentials: true,
      });
      const filteredComments = response.data.comments.filter(
        (comment) => comment.commentedBy.userId === userId
      );
      filteredComments.reverse();
      setAllComments(filteredComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [hostel, userId]);

  const handleCommentChange = (event) => {
    setSingleComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (singleComment.trim() !== "") {
      const newComment = {
        commentText: singleComment,
        commentedBy: {
          username,
          firstName,
          profilePicture,
          userId,
          hostel,
        },
        commentTime: Date.now(),
        isDeleted: false,
      };

      try {
        const response = await axios.post(ADD_COMMENT_ROUTE, newComment, {withCredentials: true });
        fetchData();
        setSingleComment("");
      } catch (error) {
        console.log("Error in adding comment", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="myCommentList-outer">
        <div className="myCommentList-header">
          <Link className="myComments-link" to="/myallcomments-page">
            My Comments
          </Link>
          <Link className="allComments-link" to="/comment-page">
            All Comments
          </Link>
        </div>
        <div className="myCommentList-content">
          <div className="myCommentList-left">
            <h1>My All Comments</h1>
            {allComments.map((singleCommentMap, index) => (
              <CommentSegmentSlide
                key={index}
                firstName={singleCommentMap.commentedBy.firstName}
                username={singleCommentMap.commentedBy.username}
                commentText={singleCommentMap.commentText}
                profilePicture={singleCommentMap.commentedBy.profilePicture}
                commentsUnderComment={singleCommentMap.commentsUnderComment}
                commentTime={formatTime(singleCommentMap.commentTime)}
              />
            ))}
          </div>
          <div className="myCommentList-right">
            <h1>Add Your Comment</h1>
            <textarea
              className="form-control"
              rows="10"
              value={singleComment}
              onChange={handleCommentChange}
            ></textarea>
            <button className="btn btn-primary" onClick={handleCommentSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commentlist;
