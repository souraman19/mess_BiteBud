import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Review from "./Review";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./../styles/commentsegment.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function App() {
  return (
    <div className="outer-feedback">
      <div className="upper-section">
        <h1 className="heading">Comments</h1>
        <p>Read all thoughts about our mess and food</p>
        <Link to="/patelcomment">
          <a class="btn btn-outline-secondary" href="#" role="button">
            See all comments
          </a>
        </Link>
      </div>
      <div className="feedback">
        
          <Swiper
            className="swiper-container"
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 80,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            autoplay={{ delay: 1000 }} 
            initialSlide={2} 
          >
            <SwiperSlide>
              {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
              <Review comment="random comment generated by random person, this id from a random stuendk patel " />
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src="https://swiperjs.com/demos/images/nature-2.jpg" /> */}
              <Review comment="random comment generated by random person, this id from a random stuendk patel "/>
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src="https://swiperjs.com/demos/images/nature-3.jpg" /> */}
              <Review comment="random comment generated by random person, this id from a random stuendk patel "/>
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src="https://swiperjs.com/demos/images/nature-4.jpg" /> */}
              <Review comment="random comment generated by random person, this id from a random stuendk patel "/>
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src="https://swiperjs.com/demos/images/nature-5.jpg" /> */}
              <Review comment="random comment generated by random person, this id from a random stuendk patel "/>
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src="https://swiperjs.com/demos/images/nature-6.jpg" /> */}
              <Review comment="random comment generated by random person, this id from a random stuendk patel "/>
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src="https://swiperjs.com/demos/images/nature-7.jpg" /> */}
              <Review comment="random comment generated by random person, this id from a random stuendk patel "/>
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src="https://swiperjs.com/demos/images/nature-8.jpg" /> */}
              <Review comment="random comment generated by random person, this id from a random stuendk patel "/>
            </SwiperSlide>
            <SwiperSlide>
              {/* <img src="https://swiperjs.com/demos/images/nature-9.jpg" /> */}
              <Review comment="random comment generated by random person, this id from a random stuendk patel "/>
            </SwiperSlide>
          </Swiper>
      </div>
    </div>
  );
}




#app { height: 100% }
html,
body {
  position: relative;
  height: 100%;
}
.outer-feedback{
  /* border: 2px solid rgb(5, 29, 240); */
  margin: 40px;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
}
.feedback{
    /* border: 2px solid red; */
    /* display: flex;
    justify-content: center;
    align-items: center; */
}
.outer-feedback .heading {
  padding: 1.5rem 0;
  font-size: 3.5rem;
  text-align: center;
  display: block;
  font-family: Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;

  /* background-color: #fbe6f5; */
  /* border: 3px solid #e0a7a7; */
  border-radius: 20px;
}
.upper-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
}
.upper-section h1 {
  width: 100%;
  text-align: center;
}
.upper-section a {
  display: inline-block; /* Prevent button from taking full width */
  /* margin-top: 10px; */
  font-size: larger;
  padding: 4px 20px;
}
.upper-section p{
  /* background-color: aqua; */
  text-align: center;
  font-size: 2rem;
}


body{
  background-color: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  border: 2px solid re;
}
.swiper-container {
    position: relative;
    /* border: 2px solid red; */
  }
  
  .swiper-pagination {
    position: absolute;
    bottom: 10px; /* Adjust this value to your preference */
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }
