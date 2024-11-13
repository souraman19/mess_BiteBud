import React from "react";
import "./../../styles/ComplaintSlide.css";
// import CommentReplyModal from "./CommentReplyModal";
// import CommentSeeAllCommentsModal from "./CommentSeeAllCommentsModal";
import SeeResolvedComplaintMessage from "./SeeResolvedComplaintMessage";
import { useState } from "react";
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";
import axios from "axios";
import ResolveMessage from "./ResolveMessage";
import { MdEmail } from "react-icons/md";
import { format, differenceInDays, parseISO } from 'date-fns';
import {UPVOTE_COMPLAINT_ROUTE, DOWNVOTE_COMPLAINT_ROUTE} from "./../../utils/ApiRoutes.js";



// for getting eaasy way of getting time

const formatDate = (dateString) => {
    const date = parseISO(dateString);
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




function ComplaintSlide({
  title,
  time,
  complaintId,
  // name,
  // hostel = "hostel",
  // username,
  // regNo,
  // year,
  complaint,
  // commentsOnComplaint,
  upVoteCount,
  downVoteCount,
  // upVotedMembers,
  // downVotedMembers,
  isResolved,
  // resolvedBy,
  resolvedTime,
  resolvedMessage,
}) {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  const userId = userInfo.userId;
  const username = userInfo.username;
  const hostel = userInfo.hostel;
  const firstName = userInfo.firstName;
  const year = userInfo.year;
  const profilePicture = userInfo.profilePicture;

  // const myName = user.name;
  // const myUsername = user.username;
  const myRegNo = userInfo.regNo;
  // const myYear = user.year;
  // const myProfilePic = user.profilePic;
  const identity = userInfo.userType;

  const [upVotes, setUpVotes] = useState(upVoteCount);
  const [downVotes, setDownVotes] = useState(downVoteCount);
  const [isUpVoteBlinking, setIsUpVoteBlinking] = useState(false);
  const [isDownVoteBlinking, setIsDownVoteBlinking] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  // const [isSeeAllComments, setIsSeeAllComments] = useState(false);
  // const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [seeResolvedMessage, setSeeResolvedMessage] = useState(false);

  const handleUpVote = async () => {
    try {
      // console.log(userId);
      const response = await axios.put(
        `${UPVOTE_COMPLAINT_ROUTE}/${complaintId}`,
        { userId: userId, username: username }, {withCredentials: true}
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
        `${DOWNVOTE_COMPLAINT_ROUTE}/${complaintId}`,
        { userId: userId, username: username }, {withCredentials: true}
      );
      console.log("Successfull at sending put request to server");
      // console.log(response.data.upVoteCount);
      if (response.data.downVoteCount !== downVoteCount) {
        setIsDownVoteBlinking(true);
        setTimeout(() => {
          setIsDownVoteBlinking(false);
          setDownVotes(response.data.downVoteCount);
        }, 1800);
      }
    } catch (error) {
      console.log("Error in upvoting", error);
    }
  };

  const addDisplayNoneClass = () => {
    const el = document.getElementById(
      "complaintslide_comaplintdetails_with_buttons"
    );
    el.classList.add("none_display");
  };
  const removeDisplayNoneClass = () => {
    const el = document.getElementById(
      "complaintslide_comaplintdetails_with_buttons"
    );
    el.classList.remove("none_display");
  };

  // const handleAddComment = (newComment) => {
  //   setComments([...comments, newComment]);
  // };

  const handleResolveClick = () => {
    addDisplayNoneClass();
    setIsResolving(true);
  };

  const handleClickSeeResolvinMessagegModal = () => {
    addDisplayNoneClass();
    setSeeResolvedMessage(true);
  };


  const handleCloseResolveModal = () => {
    removeDisplayNoneClass();
    setIsResolving(false);
  };

  const handleCloseSeeResolvinMessagegModal = () => {
    removeDisplayNoneClass();
    setSeeResolvedMessage(false);
  };


  //   const handleAddComment = (commentText) => {
  //     console.log("Posted Comment:", commentText);
  //     setIsReplying(false);
  //   };

  return (
    <div className="outer-swiper-plate-complaintslide">
      <div
        id="complaintslide_comaplintdetails_with_buttons"
        className="complaintslide_comaplintdetails_with_buttons"
      >
        <div className="complaintslide-username">
          {/* Display the username */}
          {/* <p>{props.username}</p> */}
          <p>{title}</p>
          {/* Resolved status */}

          {isResolved ? (
            <i
              className="fas fa-check"
              style={{ color: "green", fontSize: "1.5rem" }}
            ></i>
          ) : (
            <i
              className="fas fa-exclamation"
              style={{ color: "red", fontSize: "1.5rem" }}
            ></i>
          )}
          <div
            className={`resolved-status ${
              isResolved ? "resolved" : "not-resolved"
            }`}
          ></div>
        </div>

        <div className="swiper-client-message-complaintslide">
          <p>{complaint}</p>
          <div className="swiper-client-message-complaintslide-time">
            
            {'~ '+ formatDate(time || "2024-06-29T17:28:51.656+00:00")}
          </div>
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
                <span>&#9650;</span> {upVoteCount}
              </button>
              <button
                className={`downvote-button ${
                  isDownVoteBlinking ? "blinking" : ""
                }`}
                onClick={handleDownVote}
              >
                {/* Replace with your downvote icon */}
                <span>&#9660;</span> {downVoteCount}
              </button>
            </div>

            <div className="reply_sectiion">
              {!isResolved ? (
                <div>
                  {(identity === "ChiefWarden" || identity === "Warden") ? (
                    <button
                      className="reply-button"
                      onClick={handleResolveClick}
                    >
                      <span>&#8617;</span> Resolve
                    </button>
                  ) : (
                    <button className="reply-button">UnResolved</button>
                  )}
                </div>
              ) : (
                <div>
                  <button className="reply-button">
                    Resolved <p className="resolved_time">{formatDate(resolvedTime)}</p>
                  </button>
                </div>
              )}
              {isResolved && (
                <div onClick={handleClickSeeResolvinMessagegModal} className="Resolved_message_email_icon_complaintSlide" style={{ display: "flex", alignItems: "center" }}>
                  <MdEmail size={24} color="#3472db" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isResolving && (
        <ResolveMessage onClose={handleCloseResolveModal} complaintId={complaintId} />
      )}
      {seeResolvedMessage && (
        <SeeResolvedComplaintMessage onClose={handleCloseSeeResolvinMessagegModal} resolvedMessage = {resolvedMessage} />
      )}
    </div>
  );
}

export default ComplaintSlide;
