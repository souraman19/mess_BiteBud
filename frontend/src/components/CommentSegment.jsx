import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./../styles/commentsegment.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import CommentSegmentSlide from "./CommentSegmentSlide";

import "swiper/swiper-bundle.css"; // Import the Swiper styles

// Initiate SwiperCore
SwiperCore.use([FreeMode, Pagination]);

export default function CommentSegment() {
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
          <SwiperSlide className="swiper-slide-currentsegment">
            <CommentSegmentSlide />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-currentsegment">
            <CommentSegmentSlide />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-currentsegment">
            <CommentSegmentSlide />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-currentsegment">
            <CommentSegmentSlide />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-currentsegment">
            <CommentSegmentSlide />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-currentsegment">
            <CommentSegmentSlide />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-currentsegment">
            <CommentSegmentSlide />
          </SwiperSlide>
      
        </Swiper>


      </div>
    </div>
  );
}
