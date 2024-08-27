import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import "./../../styles/CommentSegmentSlide.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import CloseIcon from "@mui/icons-material/Close";
import CommentReplyModal from "./CommentReplyModal";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";





function CommentSegmentSlide({
  name,
  // username,
  // regNo,
  year,
  comment,
  profilePic,
  commentsOnComment,
  commentId,
  updateAllComments,
  allComments,
  // setAllComments,
  // singleComment,
  // setSingleComment,
  isMyCommentsPage = false,
  time,
}) {

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset the height to auto to allow shrinking
      textareaRef.current.style.height = "auto";

      // Set the height to match the scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editedComment, isEditing]);

  const handleDelete = async () => {
    try {
      // console.log("my id",_id);
      await axios.delete(
        `http://localhost:5000/api/deletecomment/${commentId}`
      );
      console.log("Comment deleted successfully");
      updateAllComments(
        allComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.log("Error in deleting comments", error);
    }
  };

  // console.log(time);

  const handleEdit = async () => {
    setIsEditing(true);
    try {
      await axios.put(
        `http://localhost:5000/api/updatecomment/${commentId}`,
        { comment: editedComment }
      );
      console.log("Coment edited successfully");
      updateAllComments(
        allComments.map((myComment) =>
          myComment._id === commentId
            ? { ...myComment, comment: editedComment }
            : myComment
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.log("Error in editing comments", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEdit();
    }
  };

  function handleReplyButtonClick() {
    setShowReplyModal(true);
  }

  return (
    <div className="outer-swiper-plate">
      <div className="swiper-client-message">
        <p id="comment_text">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              style={{
                border: "2px solid black",
                width: "100%",
                height: "auto",
                overflow: "hidden",
                resize: "none",
              }}
              type="text"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            comment
          )}
        </p>
        <p id="comment_creation_time">~ {time}</p>
      </div>
      <div id="comment_slide_lower_part_div_001">
        <div id="reply_comment_list_div_comment_slide">
          <AddReactionIcon className="replyIcon_comment_slide" />
          {isMyCommentsPage && (
            <>
              {isEditing ? (
                <CloseIcon
                  onClick={() => setIsEditing(false)}
                  className="replyIcon_comment_slide"
                />
              ) : (
                <EditIcon
                  onClick={() => setIsEditing(true)}
                  className="replyIcon_comment_slide"
                />
              )}
              <DeleteIcon
                onClick={handleDelete}
                className="replyIcon_comment_slide"
              />
            </>
          )}
        </div>
        <div className="swiper-client-data grid grid-three-column ">
          <img src={profilePic} alt="" srcSet="" />

          <div className="client-data-details">
            <p>{name}</p>
            <p>{year} Year</p>
          </div>
        </div>

        <div id="reply_comment_list_div_comment_slide">
          <ReplyIcon
            onClick={handleReplyButtonClick}
            className="replyIcon_comment_slide"
          />
          <SpeakerNotesIcon
            onClick={handleReplyButtonClick}
            className="replyIcon_comment_slide"
          />
        </div>
      </div>
      {showReplyModal && (
        <CommentReplyModal
          onClose={() => setShowReplyModal(false)}
          commentsOnComment={commentsOnComment}
          commentId={commentId}
        />
      )}
    </div>
  );
}

export default CommentSegmentSlide;
