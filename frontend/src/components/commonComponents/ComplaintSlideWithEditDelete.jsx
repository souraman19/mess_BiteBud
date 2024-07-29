import React from "react";
import "./../styles/ComplaintSlideWithEditDelete.css";
import CommentReplyModal from "./CommentReplyModal";
import CommentSeeAllCommentsModal from "./CommentSeeAllCommentsModal";
import { useState } from "react";
import { useUser } from "../../UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function ComplaintSlide({
  _id,
  name,
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
  allComplaints,
  updateAllComplaints,
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

  const [editedComplaint, setEditedComplaint] = useState(complaint);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = async() => {
    try{
        const response = await axios.put(`http://localhost:5000/api/updatecomplaint/${_id}`, {complaint : editedComplaint});
        console.log("Complaint editing success");
        updateAllComplaints(allComplaints.map((com) => 
            com._id === _id ? {...com, complaint: editedComplaint} : com
        ));
        setIsEditing(false);
    }catch(error){
        console.log("Error in editing complaint")
    }
  }


  const handleComplaintDelete = async() => {
    try{
        await axios.delete(`http://localhost:5000/api/deletecomplaint/${_id}`);
        updateAllComplaints(allComplaints.filter((com) => 
            com._id !== _id
        ));
        console.log("complaint deletion successful");
    } catch(error){
        console.log("Error while deleting complaints", error);
    }
  }





  return (
    <div className="outer-swiper-plate-complaintslide">

      <div id="complaintslide_comaplintdetails_with_buttons" className="">
        <div className="complaintslide-username">
          {/* Display the username */}
          {/* <p>{props.username}</p> */}
          <p>~ {name}</p>
                  {/* Resolved status */}
          <div className={`resolved-status ${isResolved ? 'resolved' : 'not-resolved'}`}>
            {isResolved ? 'Resolved' : 'Not Resolved'}
          </div>
        </div>
        <div className="swiper-client-message-complaintslide">
          {(isEditing && (!isResolved)) ? (
            <input type="text" value={editedComplaint}
            onChange={(e) => setEditedComplaint(e.target.value)}
            onKeyDown={(event) => {
                if(event.key === "Enter"){
                    event.preventDefault();
                    handleEdit();
                }
              }
            }
            />
          ):
          (<p>{complaint}</p>)}
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
            <button className="delete_button_icon"
            onClick={handleComplaintDelete}
            >
                <DeleteIcon />
            </button>
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
            <div className="replyysectiion">
              <button
                className="reply-button"
                onClick={handleSeeAllCommentsClick}
              >
                {/* Replace with your reply icon */}
                <span>&#8617;</span> See All Comments
              </button>
              <button className="reply-button" onClick={handleReplyClick}>
                {/* Replace with your reply icon */}
                <span>&#8617;</span> Reply
              </button>
            </div>
            <button className="edit_button_icon"
                onClick={() => setIsEditing(true)}
            >
                <EditIcon />
            </button>
          </div>
        </div>
      </div>
      {isReplying && (
        <CommentReplyModal
          onClose={handleCloseReplyModal}
          complaintId={_id}
          commentsOnComplaint={commentsOnComplaint}
          onAddComment={handleAddComment}
        />
      )}
      {isSeeAllComments && (
        <CommentSeeAllCommentsModal
          onClose={handleCloseSeeAllCommentsModal}
          complaintId={_id}
          commentsOnComplaint={commentsOnComplaint}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
}

export default ComplaintSlide;
