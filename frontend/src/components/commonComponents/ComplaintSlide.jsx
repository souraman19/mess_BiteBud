import React from "react";
import "./../../styles/ComplaintSlide.css";
import CommentReplyModal from "./CommentReplyModal";
import CommentSeeAllCommentsModal from "./CommentSeeAllCommentsModal"
import { useState } from "react";
import { useUser } from "../../UserContext";
import axios from "axios";

function ComplaintSlide({
  title,
  _id,
  name,
  hostel = "hostel",
  username,
  regNo,
  year,
  complaint,
  commentsOnComplaint,
  upVoteCount,
  downVoteCount,
  upVotedMembers,
  downVotedMembers,
  isResolved,
}) {
  const { user, updateUser } = useUser();
  const myName = user.name;
  const myUsername = user.username;
  const myRegNo = user.regNo;
  const myYear = user.year;
  const myProfilePic = user.profilePic;

  const [upVotes, setUpVotes] = useState(upVoteCount);
  const [downVotes, setDownVotes] = useState(downVoteCount);
  const [isUpVoteBlinking, setIsUpVoteBlinking] = useState(false);
  const [isDownVoteBlinking, setIsDownVoteBlinking] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isSeeAllComments, setIsSeeAllComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleUpVote = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/upvote/${_id}`,
        { myRegNo: myRegNo }
      );
      console.log("Successfull at sending put request to server");
      // console.log(response.data.upVoteCount);
      if (response.data.upVoteCount !== upVoteCount) {
        setIsUpVoteBlinking(true);
        setTimeout(() => {
          setIsUpVoteBlinking(false);
          setUpVotes(response.data.upVoteCount);
        }, 1800);
      }
    } catch (error) {
      console.log("Error in upvoting", error);
    }
  };

  const handleDownVote = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/downvote/${_id}`,
        { myRegNo: myRegNo }
      );
      console.log("Successfull at sending put request to server");
      // console.log(response.data.upVoteCount);
      if (response.data.downVoteCount !== downVoteCount) {
        setIsDownVoteBlinking(true);
        setTimeout(() => {
          setIsDownVoteBlinking(false);
          setDownVotes(response.data.upVoteCount);
        }, 1800);
      }
    } catch (error) {
      console.log("Error in upvoting", error);
    }
  };

  const addDisplayNoneClass = () => {
    const el = document.getElementById("complaintslide_comaplintdetails_with_buttons");
    el.classList.add("none_display");
  }
  const removeDisplayNoneClass = () => {
    const el = document.getElementById("complaintslide_comaplintdetails_with_buttons");
    el.classList.remove("none_display");
  }

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };


  const handleReplyClick = () => {
    addDisplayNoneClass();
    setIsReplying(true);
  };
  const handleSeeAllCommentsClick = () => {
    addDisplayNoneClass();
    setIsSeeAllComments(true);
  };

  const handleCloseReplyModal = () => {
    removeDisplayNoneClass();
    setIsReplying(false);
  };
  const handleCloseSeeAllCommentsModal = () => {
    removeDisplayNoneClass();
    setIsSeeAllComments(false);
  };

  //   const handleAddComment = (commentText) => {
  //     console.log("Posted Comment:", commentText);
  //     setIsReplying(false);
  //   };

  return (
    <div className="outer-swiper-plate-complaintslide">
      <div id="complaintslide_comaplintdetails_with_buttons" className="complaintslide_comaplintdetails_with_buttons" >

        <div className="complaintslide-username">
          {/* Display the username */}
          {/* <p>{props.username}</p> */}
          <p>{title}</p>
          {/* Resolved status */}

          {isResolved ? 
      <i className="fas fa-check" style={{ color: 'green', fontSize: '1.5rem' }}></i> : 
      <i className="fas fa-exclamation" style={{ color: 'red', fontSize: '1.5rem' }}></i>
    }
          <div className={`resolved-status ${isResolved ? 'resolved' : 'not-resolved'}`}>
          </div>

        </div>
        
        <div className="swiper-client-message-complaintslide">
          <p>{complaint}</p>
          <p className="swiper-client-message-complaintslide-time"> ~ 2 days ago</p>
        </div>
        {/* <div className="swiper-client-data-complaintslide grid grid-two-column">
                 
                    <img src="https://images.lifestyleasia.com/wp-content/uploads/sites/6/2023/08/21181242/best-zhao-lusi-dramas-chinese-tv-shows-hidden-love-the-roance-of-tiger-and-rose-dating-in-the-kitchen-rosy-zhao-1234x900.jpg?tr=w-1600" alt="" srcset="" />
                 
                 <div className="client-data-details-complaintslide">
                    <p>Sourajit Mandal</p>
                    <p>Entrepreneur</p>
                 </div>
            </div> */}
        <div className="swiper-client-message-complaintslide2">
          <div className="comment-buttons">
            <div className="voting-button">
              <button
                className={`upvote-button ${
                  isUpVoteBlinking ? "blinking" : ""
                }`}
                onClick={handleUpVote}
              >
                {/* Replace with your upvote icon */}
                <span>&#9650;</span> {upVotes}
              </button>
              <button
                className={`downvote-button ${
                  isDownVoteBlinking ? "blinking" : ""
                }`}
                onClick={handleDownVote}
              >
                {/* Replace with your downvote icon */}
                <span>&#9660;</span> {downVotes}
              </button>
            </div>

            <div className="reply_sectiion">
              {
                hostel=='hostel' ? 
                (
                  <button className="reply-button" onClick={handleReplyClick}>
                    <span>&#8617;</span> Resolve
                  </button>
                ):(
                  <div>
                    <button className="reply-button" onClick={handleReplyClick}>
                     Resolved <p className="resolved_time">3 days ago</p>
                  </button>

                  </div>

                )
              }
            </div>

          </div>
        </div>
      </div>
      {isReplying && (
        <CommentReplyModal
          onClose={handleCloseReplyModal}
          complaintId = {_id}
          commentsOnComplaint={commentsOnComplaint}
          onAddComment={handleAddComment}
        />
      )}
      {isSeeAllComments && (
        <CommentSeeAllCommentsModal
          onClose={handleCloseSeeAllCommentsModal}
          complaintId = {_id}
          commentsOnComplaint={commentsOnComplaint}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
}

export default ComplaintSlide;
