import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCards } from 'swiper/modules';
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import "./../../styles/CurrentMessMenu.css";
import "./../../styles/CurrentMessMenu2.css";
import slide_image_1 from "./../../srcimages/food1.jpg";
import slide_image_2 from "./../../srcimages/food2.jpg";
import slide_image_3 from "./../../srcimages/food3.jpg";
import slide_image_4 from "./../../srcimages/food4.jpg";
import slide_image_5 from "./../../srcimages/food1.jpg";
import slide_image_6 from "./../../srcimages/food2.jpg";
import slide_image_7 from "./../../srcimages/food3.jpg";

function Comment() {
  const { user } = useUser();
  const hostel = user?.hostel;

  const [allMenus, setAllMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const messmenu = await axios.get("http://localhost:5000/api/getmessmenu");
      const today = new Date(); 
      const dayOfWeek = today.toLocaleString('en-US', { weekday: 'long' });
      const myMenu = messmenu.data.filter((singlemenu) => (singlemenu.day === dayOfWeek));

      setAllMenus(prevMenus => [...prevMenus, ...myMenu]);
    }
    fetchData();
  }, [allMenus]);

  return (
    <div className="container mx-auto p-6">
      <div className="upper-section1 text-center mb-8">
        <h1 className="heading1 text-4xl font-extrabold text-gray-800 mb-4">Enjoy Today's Food</h1>
        <Link to="/patelfullmenu">
          <a className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" role="button">
            See the Full Menu
          </a>
        </Link>
      </div>

      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="swiper-complaint"
      >
        <SwiperSlide className="swiper-slide-complaint bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold text-yellow-800 mb-4">Breakfast</h2>
          <ul className="list-disc list-inside text-yellow-700 space-y-2">
            <li>Pancakes</li>
            <li>Omelette</li>
            <li>Cereal</li>
            {/* Add more breakfast items here */}
          </ul>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-complaint bg-gradient-to-r from-green-300 via-green-200 to-green-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold text-green-800 mb-4">Lunch</h2>
          <ul className="list-disc list-inside text-green-700 space-y-2">
            <li>Grilled Chicken</li>
            <li>Caesar Salad</li>
            <li>Pasta</li>
            {/* Add more lunch items here */}
          </ul>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-complaint bg-gradient-to-r from-pink-300 via-pink-200 to-pink-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold text-pink-800 mb-4">Snacks</h2>
          <ul className="list-disc list-inside text-pink-700 space-y-2">
            <li>Chips</li>
            <li>Fruit</li>
            <li>Nuts</li>
            {/* Add more snack items here */}
          </ul>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-complaint bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-4">Dinner</h2>
          <ul className="list-disc list-inside text-blue-700 space-y-2">
            <li>Steak</li>
            <li>Vegetables</li>
            <li>Rice</li>
            {/* Add more dinner items here */}
          </ul>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Comment;
