import React from "react";
import "./../styles/ComplaintSlide.css";
import CommentModal from "./CommentModal";
import { useState } from "react";
import { useUser } from "./../UserContext";
import axios from "axios";

function ComplaintSlide({_id, name, username, regNo, year, complaint, commentsOnComplaint, upVoteCount, downVoteCount, upVotedMembers ,downVotedMembers}) {

  
  const {user, updateUser} = useUser();
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
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };
  
    const handleUpVote = async() => {
      try{
        const response = await axios.put(`http://localhost:5000/api/upvote/${_id}`, {myRegNo: myRegNo})
        console.log("Successfull at sending put request to server");
        // console.log(response.data.upVoteCount);
        if(response.data.upVoteCount !== upVoteCount){
          setIsUpVoteBlinking(true);
          setTimeout(() => {
            setIsUpVoteBlinking(false)
            setUpVotes(response.data.upVoteCount);
          }, 1800);
        }
      }catch(error){
        console.log("Error in upvoting", error);
      }
    };
  
    const handleDownVote = async() => {
      try{
        const response = await axios.put(`http://localhost:5000/api/downvote/${_id}`, {myRegNo: myRegNo})
        console.log("Successfull at sending put request to server");
        // console.log(response.data.upVoteCount);
        if(response.data.downVoteCount !== downVoteCount){
          setIsDownVoteBlinking(true);
          setTimeout(() => {
            setIsDownVoteBlinking(false)
            setDownVotes(response.data.upVoteCount);
          }, 1800);
        }
      }catch(error){
        console.log("Error in upvoting", error);
      }
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
        <p>{name}</p>
      </div>
      <div className="swiper-client-message-complaintslide">
        <p>{complaint}</p>
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
              className={`upvote-button ${isUpVoteBlinking ? "blinking" : ""}`}
              onClick={handleUpVote}
            >
              {/* Replace with your upvote icon */}
              <span>&#9650;</span> {upVotes}
            </button>
            <button
              className={`downvote-button ${isDownVoteBlinking ? "blinking" : ""}`}
              onClick={handleDownVote}
            >
              {/* Replace with your downvote icon */}
              <span>&#9660;</span>  {downVotes}
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
