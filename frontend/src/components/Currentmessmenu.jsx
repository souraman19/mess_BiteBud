import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import slide_image_1 from "./../srcimages/food1.jpg";
import slide_image_2 from "./../srcimages/food2.jpg";
import slide_image_3 from "./../srcimages/food3.jpg";
import slide_image_4 from "./../srcimages/food4.jpg";
import slide_image_5 from "./../srcimages/food1.jpg";
import slide_image_6 from "./../srcimages/food2.jpg";
import slide_image_7 from "./../srcimages/food3.jpg";

function Comment() {
  return (
    <div className="container">
      <div className="upper-section1">
        <h1 className="heading1">Enjoy Today's food</h1>
        <Link to="/patelfullmenu">
          <a class="btn btn-primary" href="#" role="button">
            See the full menu
          </a>
        </Link>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src={slide_image_1} alt="slide_image" />
          <div className="text-overlay">
            <h2>Title 1</h2>
            <p>Description 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_2} alt="slide_image" />
          <div className="text-overlay">
            <h2>Title 1</h2>
            <p>Description 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_3} alt="slide_image" />
          <div className="text-overlay">
            <h2>Title 1</h2>
            <p>Description 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_4} alt="slide_image" />
          <div className="text-overlay">
            <h2>Title 1</h2>
            <p>Description 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_5} alt="slide_image" />
          <div className="text-overlay">
            <h2>Title 1</h2>
            <p>Description 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_6} alt="slide_image" />
          <div className="text-overlay">
            <h2>Title 1</h2>
            <p>Description 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_7} alt="slide_image" />
          <div className="text-overlay">
            <h2>Title 1</h2>
            <p>Description 1</p>
          </div>
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Comment;
