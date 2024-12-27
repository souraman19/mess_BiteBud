import React from "react";
import "./../../styles/ComplaintSlideWithEditDelete.css";
import CommentReplyModal from "./CommentReplyModal";
import CommentSeeAllCommentsModal from "./CommentSeeAllCommentsModal";
import { useState } from "react";
import { useStateProvider } from "../../context/StateContext.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import {
  UPVOTE_COMPLAINT_ROUTE,
  DOWNVOTE_COMPLAINT_ROUTE,
  DELETE_COMPLAINT_ROUTE,
  EDIT_COMPLAINT_ROUTE,
} from "./../../utils/ApiRoutes.js";

const formatTime = (time) => {
  const parsedTime = new Date(time);
  const timeSinceCreated = new Date() - new Date(time);
  if(timeSinceCreated < 24 * 60 * 60 * 1000){ // less than 24 hours
    return parsedTime.toLocaleTimeString();
  } else {
    return parsedTime.toDateString() + " " + parsedTime.toLocaleTimeString();
  }
};

function ComplaintSlide({
  complaintId,
  name,
  complaint,
  time,
  complaintHeading,
  upVoteCount,
  downVoteCount,
  isResolved,
  createdAt,
  allComplaints,
  updateAllComplaints,
  fetchData,
}) {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  const myRegNo = userInfo.regNo;
  const userId = userInfo.userId;
  const username = userInfo.username;
  const hostel = userInfo.hostel;
  const firstName = userInfo.firstName;
  const year = userInfo.year;
  const profilePicture = userInfo.profilePicture;
  const identity = userInfo.userType;

  const [upVotes, setUpVotes] = useState(upVoteCount);
  const [downVotes, setDownVotes] = useState(downVoteCount);
  const [isUpVoteBlinking, setIsUpVoteBlinking] = useState(false);
  const [isDownVoteBlinking, setIsDownVoteBlinking] = useState(false);
  const [comments, setComments] = useState([]);
  const [editedComplaint, setEditedComplaint] = useState(complaint);
  const [editedHeading, setEditedHeading] = useState(complaintHeading);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const timeSinceCreated = () => {
    const timeDiff = new Date() - new Date(createdAt);
    // console.log(timeDiff);
    // console.log(new Date());
    // console.log(new Date(createdAt));
    // console.log(createdAt);
    const timeDiffInSeconds = timeDiff / 1000;
    const timeDiffInDays = timeDiffInSeconds / (60 * 60 * 24);
    // console.log(timeDiffInDays);
    // console.log(timeDiffInDays < 1);
    return timeDiffInDays;
  };

  // timeSinceCreated();

  const handleUpVote = async () => {
    try {
      const response = await axios.put(
        `${UPVOTE_COMPLAINT_ROUTE}/${complaintId}`,
        { userId: userId, username: username },
        { withCredentials: true }
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
        { userId: userId, username: username },
        { withCredentials: true }
      );
      console.log("Successfull at sending put request to server");
      // console.log(response.data.downVoteCount);
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

  const handleEdit = async () => {
    try {
      await axios.put(`${EDIT_COMPLAINT_ROUTE}/${complaintId}`, {
        complaint: editedComplaint,
        complaintHeading: editedHeading,
      });
      console.log("Complaint editing success");
      fetchData();
      setIsEditing(false);
    } catch (error) {
      console.log("Error in editing complaint");
    }
  };

  const handleComplaintDelete = async () => {
    try {
      await axios.delete(`${DELETE_COMPLAINT_ROUTE}/${complaintId}`);
      console.log("complaint deletion successful");
      fetchData();
    } catch (error) {
      console.log("Error while deleting complaints", error);
    }
  };

  return (
    <div className="outer-swiper-plate-complaintslide_with_edit_delete">
      <div id="complaintslide_comaplintdetails_with_buttons" className="">
        <div className="complaintslide-username_with_edit_delete">
          {/* Display the heading */}
          <div>
            {isEditing && !isResolved ? (
              <input
                type="text"
                value={editedHeading}
                onChange={(e) => setEditedHeading(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleEdit();
                  }
                }}
              />
            ) : (
              <div>{complaintHeading}</div>
            )}
          </div>
          {/* Resolved status */}
          <div
            className={`resolved-status ${
              isResolved
                ? "resolved_with_edit_delete"
                : "not-resolved_with_edit_delete"
            }`}
          >
            {isResolved ? "Resolved" : "Not Resolved"}
          </div>
        </div>
        <div className="swiper-client-message-complaintslide_with_edit_delete">
          <div>
          {isEditing && !isResolved ? (
            <input
              type="text"
              value={editedComplaint}
              onChange={(e) => setEditedComplaint(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleEdit();
                }
              }}
            />
          ) : (
            <p>{complaint}</p>
          )}
          </div>
          <div className = "complaint-slide-withedit-delete-timeshow">
            <p>~ {formatTime(time)}</p>
          </div>
        </div>
        {/* <div className="swiper-client-data-complaintslide grid grid-two-column">
                 
                    <img src="https://images.lifestyleasia.com/wp-content/uploads/sites/6/2023/08/21181242/best-zhao-lusi-dramas-chinese-tv-shows-hidden-love-the-roance-of-tiger-and-rose-dating-in-the-kitchen-rosy-zhao-1234x900.jpg?tr=w-1600" alt="" srcset="" />
                 
                 <div className="client-data-details-complaintslide">
                    <p>Sourajit Mandal</p>
                    <p>Entrepreneur</p>
                 </div>
            </div> */}
        <div className="swiper-client-message-complaintslide2_with_edit_delete">
          <div className="comment-buttons_with_edit_delete">
            <button
              className="delete_button_icon_with_edit_delete"
              onClick={handleComplaintDelete}
            >
              <DeleteIcon />
            </button>
            <div className="voting-button_with_edit_delete">
              <button
                className={`upvote-button ${
                  isUpVoteBlinking ? "blinking_with_edit_delete" : ""
                }`}
                onClick={handleUpVote}
              >
                {/* Replace with your upvote icon */}
                <span>&#9650;</span> {upVotes}
              </button>
              <button
                className={`downvote-button ${
                  isDownVoteBlinking ? "blinking_with_edit_delete" : ""
                }`}
                onClick={handleDownVote}
              >
                {/* Replace with your downvote icon */}
                <span>&#9660;</span> {downVotes}
              </button>
            </div>
            <button
              className="edit_button_icon_with_edit_delete"
              onClick={() => {
                timeSinceCreated() < 1
                  ? setIsEditing(true)
                  : setShowToast(true);
              }}
            >
              <EditIcon />
            </button>

            {/* Toast Notification */}
            <ToastContainer position="top-end" className="p-3">
              <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                delay={3000}
                autohide
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                <Toast.Header>
                  <strong className="me-auto" style={{ color: "black" }}>
                    Edit Access
                  </strong>
                </Toast.Header>
                <Toast.Body
                  style={{
                    padding: "10px",
                    fontSize: "1.2rem",
                  }}
                >
                  Time limit expired for edit access
                </Toast.Body>
              </Toast>
            </ToastContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintSlide;
