import React from "react";
import "./../../styles/ComplaintSegmentSlide.css";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

function ComplaintSegmentSlide({ username, complaint, upVoteCount, downVoteCount }) {
  return (
    <div className="outer-swiper-plate-complaint-segment-slide">
      <div className="swiper-client-message-complaint-segment-slide">
        <p>{complaint}</p>
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
