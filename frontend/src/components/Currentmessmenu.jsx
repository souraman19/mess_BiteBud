import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { useState, useEffect } from "react";
import {useUser} from "./../UserContext";
import "./../styles/CurrentMessMenu.css";

import slide_image_1 from "./../srcimages/food1.jpg";
import slide_image_2 from "./../srcimages/food2.jpg";
import slide_image_3 from "./../srcimages/food3.jpg";
import slide_image_4 from "./../srcimages/food4.jpg";
import slide_image_5 from "./../srcimages/food1.jpg";
import slide_image_6 from "./../srcimages/food2.jpg";
import slide_image_7 from "./../srcimages/food3.jpg";

function Comment() {
  const {user, updateUser} = useUser();
  const hostel = user.hostel;

  const [allMenus, setAllMenus] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
        const messmenu = await axios.get("http://localhost:5000/api/getmessmenu");
        // console.log(messmenu);
        const today = new Date(); // Create a new Date object for the current date and time
        const dayOfWeek = today.toLocaleString('en-US', { weekday: 'long' }); // Get the full name of the day
        const myMenu = messmenu.data.filter((singlemenu) => (singlemenu.day === dayOfWeek));
        // console.log("my menu", myMenu);
        // console.log("mymnu0", myMenu[0])

        //NOT A GOOD IDEA TO USE SETTIME OUT
        //YOU HAVE TO FIGURE OUT OTHER WY TO UPDATE
        //SO THAT THERE IS NO PROBLEM DUE TO ASYNC NATURE

          setAllMenus(prevMenus => [...prevMenus, ...myMenu]);
        
        // console.log("all menus", allMenus);

        // setTimeout(()=>{
        //   setAllMenus(myMenu);
        // console.log("mess menu fetch success");
        // }, 5000);
    }
    fetchData();
}, [allMenus]);

  
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
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 20,
          depth: 170,
          modifier: 1.5,
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
        {(allMenus.length) && allMenus[0].allFoodItems.map((singleItem) => (
            <SwiperSlide className="swiiper-minejv">
            <img src={require(`./../uploadmenus/${singleItem.img}`)} alt="slide_image" />
            <div className="text-overlay">
              <h2 style={{color:"white"}}>{singleItem.name}</h2>
              <p>{singleItem.time}</p>
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
