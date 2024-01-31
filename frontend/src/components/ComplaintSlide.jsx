import React from "react";
import "./../styles/complaintslide.css";
import CommentModal from "./CommentModal";
import { useState } from "react";

import { useUser } from "./../UserContext";

function ComplaintSlide(props) {
  const { user } = useUser();
  const { username, identity, gmail } = user;
  
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [isUpvoteBlinking, setIsUpvoteBlinking] = useState(false);
    const [isDownvoteBlinking, setIsDownvoteBlinking] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };
  
    const handleUpvote = () => {
      setUpvotes(upvotes + 1);
      setIsUpvoteBlinking(true);
      setTimeout(() => setIsUpvoteBlinking(false), 1000);
    };
  
    const handleDownvote = () => {
      setDownvotes(downvotes + 1);
      setIsDownvoteBlinking(true);
      setTimeout(() => setIsDownvoteBlinking(false), 1000);
    };

    const handleReplyClick = () => {
        
        setIsReplying(true);
      };

      const handleCloseCommentModal = () => {
        setIsReplying(false);
      };
    
    //   const handleAddComment = (commentText) => {
    //     console.log("Posted Comment:", commentText);
    //     setIsReplying(false);
    //   };
  


  return (
    <div className="outer-swiper-plate-complaintslide">
    <div className="complaintslide-username">
        {/* Display the username */}
        {/* <p>{props.username}</p> */}
        <p>{username}</p>
      </div>
      <div className="swiper-client-message-complaintslide">
        <p>{props.complaint}</p>
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
              className={`upvote-button ${isUpvoteBlinking ? "blinking" : ""}`}
              onClick={handleUpvote}
            >
              {/* Replace with your upvote icon */}
              <span>&#9650;</span> {upvotes}
            </button>
            <button
              className={`downvote-button ${isDownvoteBlinking ? "blinking" : ""}`}
              onClick={handleDownvote}
            >
              {/* Replace with your downvote icon */}
              <span>&#9660;</span>  {downvotes}
            </button>
          </div>
          <div className="replyysectiion">
          <button className="reply-button">
            {/* Replace with your reply icon */}
            <span></span> See All Comments
          </button>
          <button className="reply-button" onClick={handleReplyClick}>
            {/* Replace with your reply icon */}
            <span>&#8617;</span> Reply
          </button>
          </div>
        </div>
      </div>
      {isReplying && <CommentModal onClose={handleCloseCommentModal} comments={comments} onAddComment={handleAddComment} />}
    </div>
  );
}

export default ComplaintSlide;
