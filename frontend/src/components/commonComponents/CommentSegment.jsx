import React, { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./../../styles/CommentSegment.css";
import "swiper/swiper-bundle.css";

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import axios from "axios";
import { format, differenceInDays, parseISO } from 'date-fns';
import CommentSegmentSlide from "./CommentSegmentSlide";

import {GET_ALL_COMMENTS_ROUTE} from "./../../utils/ApiRoutes.js"
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";




const formatTime = (time) => {
  const parsedTime = new Date(time);
  const timeSinceCreated = new Date() - new Date(time);
  if(timeSinceCreated < 24 * 60 * 60 * 1000){ // less than 24 hours
    return parsedTime.toLocaleTimeString();
  } else {
    return parsedTime.toDateString() + " " + parsedTime.toLocaleTimeString();
  }
};


// Initiate SwiperCore
SwiperCore.use([FreeMode, Pagination]);

export default function CommentSegment() {

const [{ userInfo, newUser }, dispatch] = useStateProvider();

  // console.log("User in 1: ", userInfo);
  // const name = user?.name;
  // const regNo = user?.regNo;
  const hostel = userInfo?.hostel;
  // const username = user?.username;
  // const year = user?.year;
  const profilePicture = userInfo?.profilePicture;

  const [comments, setComments] = useState([]);
  const [singleComment, setSingleComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(GET_ALL_COMMENTS_ROUTE, {params: {hostel}, withCredentials: true});
        // console.log(response.data.comments);
        const myHostelComments = response.data.comments.reverse();
        setComments(myHostelComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  const updateAllComments = (updatedComments) =>{
    setAllComments(updatedComments);
  };

  // console.log("Autoplay Config:", {
  //   delay: 1000,
  //   disableOnInteraction: false,
  // });
  return (
    //outermost box
    <div className="outer-feedback-commentsegment">

      {/* //1st box upper box */}
      <div className="upper-section-commentsegment">
        <h1 className="heading">Comments</h1>
        <p>Read all thoughts about our mess and food</p>
        <Link to="/comment-page">
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
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          className="mySwiper"
        >
          {comments.map((singleCommentMap) => 
            <SwiperSlide className="swiper-slide-currentsegment" key = {singleCommentMap.id}>
              <CommentSegmentSlide 
               username = {singleCommentMap.username} 
               firstname = {singleCommentMap.firstname}
               regNo = {singleCommentMap.regNo}
               year = {singleCommentMap.year}
               commentText={singleCommentMap.commentText} 
               profilePicture = {singleCommentMap.commentedBy.profilePicture}
                commentsUnderComment = {singleCommentMap.commentsUnderComment}
                commentId = {singleCommentMap.commentId}
                updateAllComments = {updateAllComments}
              allComments = {allComments}
              setAllComment = {setAllComments}
              singleComment = {singleComment}
              setSingleComment = {setSingleComment}
              commentTime = {formatTime(singleCommentMap.commentTime)}
              />

            </SwiperSlide>
          )}
      
        </Swiper>


      </div>
    </div>
  );
}
