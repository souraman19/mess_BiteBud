import React, { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./../../styles/CommentSegment.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import {useUser} from "./../../UserContext";
import axios from "axios";
import CommentSegmentSlide from "./CommentSegmentSlide";

import "swiper/swiper-bundle.css"; // Import the Swiper styles

import { format, differenceInDays, parseISO } from 'date-fns';


// for getting eaasy way of getting time

const formatDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    console.error("Invalid dateString:", dateString);
    return "";
}

let date;
    if (typeof dateString === 'string') {
        try {
            date = parseISO(dateString);
        } catch (error) {
            console.error("Failed to parse ISO date:", error);
            return "";
        }
    } else if (dateString instanceof Date) {
        date = dateString; // Already a Date object
    } else {
        console.error("Unexpected dateString type:", typeof dateString);
        return "";
    }
    
    const now = new Date();
    const difference = differenceInDays(now, date);


    if (difference === 0) {
        return 'today';
    } else if (difference === 1) {
        return 'yesterday';
    } else if (difference > 1 && difference <= 7) {
        return `${difference} days ago`;
    } else {
        return `on ${format(date, 'dd MMMM yyyy')}`;
    }
};


// Initiate SwiperCore
SwiperCore.use([FreeMode, Pagination]);

export default function CommentSegment() {
  const {user} = useUser();
  console.log("User in 1: ", user);
  // const name = user?.name;
  // const regNo = user?.regNo;
  const hostel = user?.hostel;
  // const username = user?.username;
  // const year = user?.year;
  const profilePic = user?.profilePic;

  const [comments, setComments] = useState([]);
  const [singleComment, setSingleComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patelcomments");
        const myHostelComments = response.data;
        if(hostel !== 'hostel'){
          const myHostelComments = response.data.filter((comment) => comment.hostel === hostel)
          setComments(myHostelComments);
        } else {
          setComments(myHostelComments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  const updateAllComments = (updatedComments) =>{
    setAllComments(updatedComments);
  };

  console.log("Autoplay Config:", {
    delay: 1000,
    disableOnInteraction: false,
  });
  return (
    //outermost box
    <div className="outer-feedback-commentsegment">

      {/* //1st box upper box */}
      <div className="upper-section-commentsegment">
        <h1 className="heading">Comments</h1>
        <p>Read all thoughts about our mess and food</p>
        <Link to="/patelcomment">
          <a class="btn btn-outline-secondary" href="#" role="button">
            See all comments
          </a>
        </Link>
      </div>

      {/* //2nd box lower box */}
      <div className="feedback swiper-container">
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {comments.map((singleCommentMap) => 
            <SwiperSlide className="swiper-slide-currentsegment" key = {singleCommentMap.id}>
              <CommentSegmentSlide 
               name = {singleCommentMap.name} 
               username = {singleCommentMap.username}
               regNo = {singleCommentMap.regNo}
               year = {singleCommentMap.year}
               comment={singleCommentMap.comment} 
               profilePic = {profilePic}
                commentsOnComment = {singleCommentMap.commentsOnComment}
                commentId = {singleCommentMap._id}
                updateAllComments = {updateAllComments}
              allComments = {allComments}
              setAllComment = {setAllComments}
              singleComment = {singleComment}
              setSingleComment = {setSingleComment}
              time = {formatDate(singleCommentMap.time)}
              />

            </SwiperSlide>
          )}
      
        </Swiper>


      </div>
    </div>
  );
}
