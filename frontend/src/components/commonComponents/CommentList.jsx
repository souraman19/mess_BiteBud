import React, { useState, useEffect } from "react";
import CommentSegmentSlide from "./CommentSegmentSlide";
import "./../../styles/CommentList.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";
import {
  GET_ALL_COMMENTS_ROUTE,
  ADD_COMMENT_ROUTE,
} from "./../../utils/ApiRoutes.js";

import { format, differenceInDays, parseISO } from "date-fns";

// for getting eaasy way of getting time

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
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  const userId = userInfo.userId;
  const username = userInfo.username;
  const regNo = userInfo.regNo;
  const hostel = userInfo.hostel;
  const firstName = userInfo.firstName;
  const year = userInfo.year;
  const profilePicture = userInfo.profilePicture;

  const [singleComment, setSingleComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(GET_ALL_COMMENTS_ROUTE, {
      params: { hostel },
      withCredentials: true,
    });
    console.log(response.data);
    // const commentInfoArray = response.data.map((commentObj) => commentObj);
    const myHostelComments = response.data.comments;
    myHostelComments.reverse();
    setAllComments(myHostelComments);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);

  const handleCommentChange = (event) => {
    setSingleComment(event.target.value);
  };
  const updateAllComments = (updatedComments) => {
    setAllComments(updatedComments);
  };

  const handleCommentSubmit = async () => {
    if (singleComment.trim() !== "") {
      // Add the new  to the list

      const newComment = {
        commentText: singleComment,
        commentedBy: {
          username: username,
          firstName: firstName,
          profilePicture: profilePicture,
          userId: userId,
          hostel: hostel,
        },
        commentsUnderComment: [],
        commentTime: Date.now(),
        isDeleted: false,
      };

      try {
        const response = await axios.post(ADD_COMMENT_ROUTE, newComment);
        console.log("Comment added successflly", response.data);

        // console.log(response.data.complaints);
        try {
          fetchData();
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
        setSingleComment("");
        // console.log("hell0 =>>>   this is a meess", formatTime(new Date()));
      } catch (error) {
        console.log("Error in adding comment", error);
      }
    }
  };

  return (
    <div className="commentList-outer">
      {/* Left Scrollable Section */}
      <div className="commentList-second-outer">
        <h1>Comment List</h1>
        <div className="row">
          {allComments.map((comment, index) => (
            <div key={index} className="col-12 col-sm-8 col-md-8 col-lg-8 mb-4">
              <CommentSegmentSlide
                firstName={comment.commentedBy.firstName}
                username={comment.commentedBy.username}
                commentText={comment.commentText}
                profilePicture={comment.commentedBy.profilePicture}
                commentsUnderComment={comment.commentsUnderComment}
                commentId={comment.commentId}
                updateAllComments={setAllComments}
                commentTime={formatTime(comment.commentTime)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Sticky Form Section */}
      <div className="add-comment-section">
        <h1 className="add-new-comment-heading">Add Your Comment</h1>
        <div className="form-group">
          <textarea
            className="form-control"
            rows="5"
            value={singleComment}
            onChange={handleCommentChange}
            placeholder="Write your comment here..."
          ></textarea>
        </div>
        <div className="submit-section">
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Commentlist;
