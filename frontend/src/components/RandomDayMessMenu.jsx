import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useUser} from "../UserContext";

// import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "./../styles/RandomDayMessMenu.css";
import axios from "axios";

function Comment({ day, myArray, updateWholeMenu }) {

  const {user, updateUser} = useUser();
  const hostel = user.hostel;

  async function handleDeleteMenu(singlefood){
    try{
      // console.log(day);
      // console.log(singlefood);
      const x = await axios.delete("http://localhost:5000/api/deletemessmenu", {data : {singlefood, day}});
      console.log(x);
      
      updateWholeMenu(x.data);
      console.log("Deletion success and ui updation success");
    } catch(error){
      console.log("error in removing item");
    }
  }


  return (
    <div className="container-randommessmenu">
      <div className="upper-section-randommessmenu">
        <h1 className="heading1-randommessmenu">{day}</h1>
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
        className="swiper_container-randommessmenu"
      >
        {myArray.map((singlefood) => (
          <SwiperSlide className="swiper-slide-randommessmenu">
            <img
              src={require(`./../uploadmenus/${singlefood.img}`)}
              alt="slide_image"
            />
            <div className="text-overlay-randommessmenu">
              <div>
                <h2 style={{color:"white"}}>{singlefood.name}</h2>
                <p>{singlefood.time}</p>
              </div>
              {(hostel === 'hostel') && (
                <div>
                  <button onClick={() => handleDeleteMenu(singlefood)}>
                    <DeleteIcon />
                  </button>
                </div>
               )}
            </div>
          </SwiperSlide>
        ))}

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
