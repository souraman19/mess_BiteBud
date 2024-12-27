import React from "react";
import "./../../styles/ComplaintSegmentSlide.css";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

const formatTime = (time) => {
  const parsedTime = new Date(time);
  const timeSinceCreated = new Date() - new Date(time);
  if(timeSinceCreated < 24 * 60 * 60 * 1000){ // less than 24 hours
    return parsedTime.toLocaleTimeString();
  } else {
    return parsedTime.toDateString() + " " + parsedTime.toLocaleTimeString();
  }
};

function ComplaintSegmentSlide({ username, complaint, upVoteCount, downVoteCount, time }) {
  return (
    <div className="outer-swiper-plate-complaint-segment-slide">
      <div className="swiper-client-message-complaint-segment-slide">
        <p>{complaint}</p>
        <p className="complaint-segement-slide-time">{formatTime(time)}</p>
      </div>
        <div className="client-data-details-complaint-segment-slide">
            <div className="upvote-count">{upVoteCount}</div>
            <p>{username}</p>
            <div className="downvote-count">{downVoteCount}</div>
        </div>
    </div>
  );
}

export default ComplaintSegmentSlide;
