import React, { useState, useEffect } from "react";
import CommentSegmentSlide from "./CommentSegmentSlide";
import "./../../styles/CommentList.css";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";
import {GET_ALL_COMMENTS_ROUTE, ADD_COMMENT_ROUTE} from "./../../utils/ApiRoutes.js";


import { format, differenceInDays, parseISO } from 'date-fns';


// for getting eaasy way of getting time

const formatDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    console.error("Invalid dateString:", dateString);
    return "";
}

let date;
    if (typeof dateString === 'string') {
        try {
            date = parseISO(dateString);
        } catch (error) {
            console.error("Failed to parse ISO date:", error);
            return "";
        }
    } else if (dateString instanceof Date) {
        date = dateString; // Already a Date object
    } else {
        console.error("Unexpected dateString type:", typeof dateString);
        return "";
    }
    
    const now = new Date();
    const difference = differenceInDays(now, date);


    if (difference === 0) {
        return 'today';
    } else if (difference === 1) {
        return 'yesterday';
    } else if (difference > 1 && difference <= 7) {
        return `${difference} days ago`;
    } else {
        return `on ${format(date, 'dd MMMM yyyy')}`;
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

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(GET_ALL_COMMENTS_ROUTE, {params: {hostel}, withCredentials: true});
        console.log("mycomm", response.data);
        // const commentInfoArray = response.data.map((commentObj) => commentObj);
        const myHostelComments = response.data.comments;
        setAllComments(myHostelComments);
    };
      fetchData();
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);
  

  const handleCommentChange = (event) => {
    setSingleComment(event.target.value);
  };
  const updateAllComments = (updatedComments) =>{
    setAllComments(updatedComments);
  };


  const handleCommentSubmit = async () => {
    if (singleComment.trim() !== "") {
      // Add the new comment to the list

      const newComment = {
        commentText:singleComment,
        commentedBy: {
          username: username,
          firstName: firstName,
          profilePicture: profilePicture,
          userId: userId,
          hostel: hostel,
        },
        commentTime: Date.now(),
      isDeleted: false,
      };
  
      try{
        const response = await axios.post(ADD_COMMENT_ROUTE, newComment);
        console.log("Comment added successflly", response.data);
        
        // console.log(response.data.complaints);
        setAllComments(response.data.comments);
        setSingleComment("");
        // console.log("hell0 =>>>   this is a meess", formatDate(new Date()));
      } catch(error){
        console.log("Error in adding comment", error);
      }
    }
  };

  

  return (
    <div className="commentlist-outer">
      <div className="commentlist-second-outer container">
        <h1>Comment List</h1>
        <div className="row">
          <div className="comment-card col-12 col-sm-8 col-md-8 col-lg-8 mb-8">
            <CommentSegmentSlide 
            commentText="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis soluta excepturi explicabo eius nam, quas aliquid eveniet provident quod ad." 
            usernamename = "Sourajit Mandal"
            profilePicture = {profilePicture}
            commentsUnderComment = {[]}
            commentTime = "today"  
            />
          </div>

          {allComments.map((singleCommentMap, index) => (
            <div
              key={index}
              className="col-12 col-sm-8 col-md-8 col-lg-8 mb-8"
            >
              <CommentSegmentSlide 
              // {...alert(formatDate(singleCommentMap.time))}
              firstName = {singleCommentMap.commentedBy.firstName} 
              username = {singleCommentMap.commentedBy.username}
              commentText={singleCommentMap.commentText} 
              profilePicture = {singleCommentMap.commentedBy.profilePicture}
              commentsUnderComment = {singleCommentMap.commentsUnderComment}
              commentId = {singleCommentMap.commentId}
              updateAllComments = {updateAllComments}
              allComments = {allComments}
              setAllComment = {setAllComments}
              singleComment = {singleComment}
              setSingleComment = {setSingleComment}
              isMyCommentsPage = {false}
              commentTime = {formatDate(singleCommentMap.commentTime)}
              
              />
            </div>
          ))}

        </div>
      </div>

      <div className="add-comment-section">
        <h1 className="add-new-comment-heading">Add your Comment here</h1>
        <div className="form-group">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            value={singleComment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <div className="submit-section">
          <button className="btn btn-primary" onClick={handleCommentSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Commentlist;
