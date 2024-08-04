import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import "./../../styles/CommentSegmentSlide.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import CommentReplyModal from "./CommentReplyModal";
import { useState } from "react";


function CommentSegmentSlide({
  name,
  username,
  regNo,
  year,
  comment,
  profilePic,
  commentsOnComment,
  commentId,
}) {
const [showReplyModal, setShowReplyModal] = useState(false);


function handleReplyButtonClick() {
  setShowReplyModal(true);
}

  return (
    <div className="outer-swiper-plate">
      <div className="swiper-client-message">
        <p id="comment_text">{comment}</p>
        <p id="comment_creation_time">~ today</p>
      </div>
      <div id="comment_slide_lower_part_div_001">
        <div>
          <AddReactionIcon className = "replyIcon_comment_slide"/>
        </div>
        <div className="swiper-client-data grid grid-three-column ">
          <img src={profilePic} alt="" srcSet="" />

          <div className="client-data-details">
            <p>{name}</p>
            <p>{year} Year</p>
          </div>
        </div>

        <div id="reply_comment_list_div_comment_slide">
          <ReplyIcon onClick={handleReplyButtonClick} className = "replyIcon_comment_slide" />
          <SpeakerNotesIcon className = "replyIcon_comment_slide" />
        </div>
      </div>
      {showReplyModal && (
        <CommentReplyModal 
          onClose = {() => setShowReplyModal(false)}
          commentsOnComment = {commentsOnComment}
          commentId = {commentId}
        />
      )}
    </div>
  );
}

export default CommentSegmentSlide;
