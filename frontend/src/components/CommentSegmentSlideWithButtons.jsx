import React, { useState } from "react";
import "./../styles/commentsegmentslidewithbuttons.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

function CommentSegmentSlideWithButtons({ _id, name, username, regNo, year, comment, updateAllComments, allComments, setAllComments, singleComment, setSingleComment, profilePic }) {
    const [editedComment, setEditedComment] = useState(comment);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async() => {
        try{
            // console.log("my id",_id);
            await axios.delete(`http://localhost:5000/api/deletecomment/${_id}`);
            console.log("Comment deleted successfully");
            updateAllComments(allComments.filter(comment => comment._id !== _id))
        }catch(error){
            console.log("Error in deleting comments", error);
        }
    }

    const handleEdit = async() =>{
        try{
            const response = await axios.put(`http://localhost:5000/api/updatecomment/${_id}`, {comment: editedComment});
            console.log("Coment edited successfully");
            updateAllComments(
                allComments.map((myComment) => 
                    myComment._id === _id ? {...myComment, comment : editedComment} : myComment
                )
            )
            setIsEditing(false);
        }catch(error){
            console.log("Error in editing comments", error);
        }
    }

    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            handleEdit();
        }
    };

  return (
    <div className="outer-swiper-plate">
      <div className="swiper-client-message">
        {isEditing ? (
            <input type="text" value={editedComment} 
            onChange={(e) => setEditedComment(e.target.value)}
            onKeyDown={handleKeyDown}
            />
        ):(
            comment
        )}
      </div>
      <div className="swiper-client-data grid grid-three-column comment_slide_lower_box">
        <button className="comment_slide_lower_box_delete_button"
        onClick={handleDelete}
        >
            <DeleteIcon />
        </button>
        <div className="comment_slide_lower_box_middle_box">
          <img
            src= {profilePic}
            alt=""
            srcset=""
          />

          <div className="client-data-details">
            <p>{name}</p>
            <p>{year} Year</p>
          </div>
        </div>
        <button className="comment_slide_lower_box_edit_button"
        onClick= {() => setIsEditing(true)}
        >
            <EditIcon />
        </button>

      </div>
    </div>
  );
}

export default CommentSegmentSlideWithButtons;
