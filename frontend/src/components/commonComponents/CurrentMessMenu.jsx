import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCards } from "swiper/modules";
import "swiper/css/navigation";
// import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { useState, useEffect } from "react";
import { useStateProvider } from "../../context/StateContext";
import "./../../styles/CurrentMessMenu.css";
import "./../../styles/CurrentMessMenu2.css";
import { GET_MESS_MENU } from "./../../utils/ApiRoutes.js";

// import slide_image_1 from "./../../srcimages/food1.jpg";
// import slide_image_2 from "./../../srcimages/food2.jpg";
// import slide_image_3 from "./../../srcimages/food3.jpg";
// import slide_image_4 from "./../../srcimages/food4.jpg";
// import slide_image_5 from "./../../srcimages/food1.jpg";
// import slide_image_6 from "./../../srcimages/food2.jpg";
// import slide_image_7 from "./../../srcimages/food3.jpg";

function Comment() {
  const [{ userInfo }] = useStateProvider();
  const myUserId = userInfo.userId;
  const myUsername = userInfo.username;
  const hostel = userInfo.hostel;
  const myName = userInfo.firstName;
  // const myHostel = userInfo.hostel;

  const [image, setImage] = useState();
  const [allImage, setAllImage] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image for modal

  const [allMenus, setAllMenus] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(GET_MESS_MENU, {
      params: { hostel },
      withCredentials: true,
    });
    const today = new Date();
    const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });
    const myMenu = response.data?.filter(
      (singlemenu) => singlemenu.day === dayOfWeek
    );
    //console.log("dkdbs", response.data);
    setAllMenus(myMenu);
    // console.log("A:", allMenus);
  };

  useEffect(() => {
    fetchData();
  }, [allMenus]);

  return (
    <div className="container mx-auto p-6">
      <div className="upper-section1 text-center mb-8">
        <h1 className="heading1 text-4xl font-extrabold text-gray-800 mb-4">
          Enjoy Mess Food
        </h1>
        <Link to="/full-menu-page">
          <a
            className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            role="button"
          >
            See the Full Menu
          </a>
        </Link>
      </div>

      {allMenus.length > 0 && (
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          style={{ width: "40vw", height: "50vh" }}
        >
          <SwiperSlide
            className="swiper-slide-complaint bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            id="swiper-slide-mess-card"
          >
            <h2 className="text-4xl font-extrabold text-blue-800 mb-4">
              Todays Meal
            </h2>
          </SwiperSlide>
          <SwiperSlide
            className=" bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            id="swiper-slide-mess-card"
          >
            <h2 className="text-4xl font-extrabold text-yellow-800 mb-4">
              Breakfast
            </h2>
            <ul className="list-disc list-inside text-yellow-700 space-y-2">
              {allMenus
                .filter((menu) => menu.slot === "Breakfast")
                .map((singleMenu, index) => (
                  <li style={{color: "black"}} key={index}> {singleMenu.menuItem.title}</li>
                ))}
            </ul>
          </SwiperSlide>
          <SwiperSlide
            className="bg-gradient-to-r from-green-300 via-green-200 to-green-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            id="swiper-slide-mess-card"
          >
            <h2 className="text-4xl font-extrabold text-green-800 mb-4">
              Lunch
            </h2>
            <ul className="list-disc list-inside text-green-700 space-y-2">
            {allMenus
                .filter((menu) => menu.slot === "Lunch")
                .map((singleMenu, index) => (
                  <li style={{color: "black"}} key={index}> {singleMenu.menuItem.title}</li>
                ))}
            </ul>
          </SwiperSlide>
          <SwiperSlide
            className="swiper-slide-complaint bg-gradient-to-r from-pink-300 via-pink-200 to-pink-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            id="swiper-slide-mess-card"
          >
            <h2 className="text-4xl font-extrabold text-pink-800 mb-4">
              Snacks
            </h2>
            <ul className="list-disc list-inside text-pink-700 space-y-2">
            {allMenus
                .filter((menu) => menu.slot === "Snacks")
                .map((singleMenu, index) => (
                  <li style={{color: "black"}} key={index}> {singleMenu.menuItem.title}</li>
                ))}
            </ul>
          </SwiperSlide>
          <SwiperSlide
            className="swiper-slide-complaint bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            id="swiper-slide-mess-card"
          >
            <h2 className="text-4xl font-extrabold text-blue-800 mb-4">
              Dinner
            </h2>
            <ul className="list-disc list-inside text-blue-700 space-y-2">
            {allMenus
                .filter((menu) => menu.slot === "Dinner")
                .map((singleMenu, index) => (
                  <li style={{color: "black"}} key={index}> {singleMenu.menuItem.title}</li>
                ))}
            </ul>
          </SwiperSlide>
        </Swiper>
      )}
    </div>
  );
}

export default Comment;
