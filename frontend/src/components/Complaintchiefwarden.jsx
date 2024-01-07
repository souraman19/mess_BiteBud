import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./../styles/complaintchiefwarden.css";
// import Randomcomplaint from "./Randomcomplaint";
import Randomcomplaintchiefwarden from "./Randomcomplaintchiefwarden";

// import required modules
import { Pagination } from "swiper/modules";

export default function Complaint() {
  return (
    <div className="outermost-box-complaint">
      <div>
        <div className="upper-section1">
          <h1 className="heading1">Read the complaints</h1>
        </div>
      </div>
      <div className="swiper-complaint">
        <>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Randomcomplaintchiefwarden />
            </SwiperSlide>

            <SwiperSlide>
            <Randomcomplaintchiefwarden />
            </SwiperSlide>

            <SwiperSlide>
            <Randomcomplaintchiefwarden />
            </SwiperSlide>

            <SwiperSlide>
            <Randomcomplaintchiefwarden />
            </SwiperSlide>

            <SwiperSlide>
            <Randomcomplaintchiefwarden />
            </SwiperSlide>

            <SwiperSlide>
            <Randomcomplaintchiefwarden />
            </SwiperSlide>
          </Swiper>
        </>
      </div>

      <div className="upper-section1">
      <Link to="/patelallcomplaint">
        <a class="btn btn-secondary" href="#" role="button">
          See all complaints & Register your Complaint
        </a>
      </Link>
      </div>
    </div>
  );
}
