import React, { useState, useEffect } from "react";
import Navbar from "../../components/commonComponents/Navbar";
// import CommentSegmentSlideWithButtons from "../../components/commonComponents/CommentSegmentSlideWithButtons";
import CommentSegmentSlide from "../../components/commonComponents/CommentSegmentSlide";
import "./../../styles/CommentList.css";
import "./../../styles/MyAllCommentsPage.css";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {useUser} from "../../UserContext";
import { Link } from "react-router-dom";
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";
import {GET_ALL_COMMENTS_ROUTE, ADD_COMMENT_ROUTE} from "./../../utils/ApiRoutes.js";


import { format, differenceInDays, parseISO } from 'date-fns';


// for getting eaasy way of getting time

const formatDate = (dateString) => {
    const date = parseISO(dateString);
    const now = new Date();
    const difference = differenceInDays(now, date);

    // return "tdy";

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
        console.log("hel", response.data.comments);
        const filteredComments = response.data.comments.filter((comment) => {
          // console.log(comment.regNo);
          // console.log(regNo);
          return comment.commentedBy.userId === userId;
        });
        
        setAllComments(filteredComments);
      };
      fetchData();
      console.log("after filter", allComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);
  

  const updateAllComments = (updatedComments) =>{
    setAllComments(updatedComments);
  };


  const handleCommentChange = (event) => {
    setSingleComment(event.target.value);
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

        setAllComments(response.data.comments);
        setSingleComment("");
      } catch(error){
        console.log("Error in adding comment", error);
      }
    }
  };

  return (
      <div>
        <Navbar />
    <div className="commentlist-outer">
    <div className="myComments_div">
            <Link to="/myallcomments-page" style={{ color: "inherit", textDecoration: "none" }}>
                    My Comments
               </Link>
               <Link to="/comment-page" style={{ color: "inherit", textDecoration: "none" }}>
                    All Comments
               </Link>
            </div>
      <div className="commentlist-second-outer container">
        <h1>My All Comments</h1>
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
                {/* {console.log(singleCommentMap._id)} */}
                <CommentSegmentSlide
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
            isMyCommentsPage = {true}
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
      </div>
  );
}

export default Commentlist;
