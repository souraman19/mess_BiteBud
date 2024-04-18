import React from "react";
import "./../styles/CommentSegmentSlideWithButtons.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

function CommentSegmentSlideWithButtons({ _id, name, username, regNo, year, comment, updateAllComments, allComments }) {
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

  return (
    <div className="outer-swiper-plate">
      <div className="swiper-client-message">
        <p>{comment}</p>
      </div>
      <div className="swiper-client-data grid grid-three-column comment_slide_lower_box">
        <button className="comment_slide_lower_box_delete_button"
        onClick={handleDelete}
        >
            <DeleteIcon />
        </button>
        <div className="comment_slide_lower_box_middle_box">
          <img
            src="https://images.lifestyleasia.com/wp-content/uploads/sites/6/2023/08/21181242/best-zhao-lusi-dramas-chinese-tv-shows-hidden-love-the-roance-of-tiger-and-rose-dating-in-the-kitchen-rosy-zhao-1234x900.jpg?tr=w-1600"
            alt=""
            srcset=""
          />

          <div className="client-data-details">
            <p>{name}</p>
            <p>{year} Year</p>
          </div>
        </div>
        <button className="comment_slide_lower_box_edit_button">
            <EditIcon />
        </button>

      </div>
    </div>
  );
}

export default CommentSegmentSlideWithButtons;
