import React from "react";
import "./../styles/CommentSegmentSlide.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function CommentSegmentSlide({ name, username, regNo, year, comment, profilePic }) {
  return (
    <div className="outer-swiper-plate">
      <div className="swiper-client-message">
        <p>{comment}</p>
      </div>
      <div className="swiper-client-data grid grid-three-column ">
        <img
          src={profilePic}
          alt=""
          srcSet=""
        />

        <div className="client-data-details">
          <p>{name}</p>
          <p>{year} Year</p>
        </div>
      </div>
    </div>
  );
}

export default CommentSegmentSlide;
