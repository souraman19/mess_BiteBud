import React, { useState, useEffect } from "react";
import Navbar from "./../../components/commonComponents/Navbar.jsx";
import { GET_MESS_MENU } from "./../../utils/ApiRoutes.js";
import axios from "axios";
import { useStateProvider } from "../../context/StateContext";
import "./../../styles/CalorieViewPage.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./../../styles/CommentSegment.css";
import "swiper/swiper-bundle.css";

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import { width } from "@mui/system";

function CalorieViewPage() {
  const [{ userInfo }] = useStateProvider();
  const userId = userInfo.userId;
  const username = userInfo.username;
  const hostel = userInfo.hostel;
  const name = userInfo.firstName;
  const userType = userInfo.userType;

  const [allMenus, setAllMenus] = useState([]);
  const [daySlotWiseMenu, setDaySlotWiseMenu] = useState([]);
  const [daySlotWiseCalorieCount, setDaySlotWiseCalorieCount] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(GET_MESS_MENU, {
      params: { hostel },
      withCrediantials: true,
    });
    setAllMenus(response.data);
    //console.log("zkhdvcjvj????????????", response.data);
    const gotMenus = response.data;
    let tempDaySlotWiseMenu = [];
    gotMenus.forEach((singleMenu) => {
      const day = singleMenu.day;
      const slot = singleMenu.slot;
      const title = singleMenu.menuItem.title;
      const image = singleMenu.menuItem.menuImage;
      const calorie = singleMenu.menuItem.calorie;

      let checkIfDayExist = tempDaySlotWiseMenu.find(
        (item) => item.day === day
      );
      if (!checkIfDayExist) {
        checkIfDayExist = {
          day: day,
          slots: [],
        };
        tempDaySlotWiseMenu.push(checkIfDayExist);
      }

      let checkIfSlotExists = checkIfDayExist.slots.find(
        (item) => item.slot === slot
      );
      if (!checkIfSlotExists) {
        checkIfSlotExists = {
          slot: slot,
          menuItems: [],
        };
        checkIfDayExist.slots.push(checkIfSlotExists);
      }

      checkIfSlotExists.menuItems.push({
        title: title,
        image: image,
        calorie: calorie,
      });
    });
    console.log("sm", tempDaySlotWiseMenu);
    console.log("Mess menu fetched successfully", gotMenus);
    setDaySlotWiseMenu(tempDaySlotWiseMenu);
    console.log("Mess menu fetched successfully");
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log("dayslt", daySlotWiseMenu);
  }, [daySlotWiseMenu]);

  return (
    <>
      <Navbar />
      <div className="outermost-div-calorie-chart-view-page">
        {daySlotWiseMenu.length > 0 && (
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            freeMode={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
            // autoplay={{
            //   delay: 10000,
            //   disableOnInteraction: true,
            // }}
            className="mySwiper"
          >
            {daySlotWiseMenu.map((singleDayMenu) => {
              // console.log("se", selectedIndex);
              return (
                <SwiperSlide
                  key={singleDayMenu.day}
                  className="swiper-slide-calorie-view-page"
                >
                      Day: {singleDayMenu.day}
                  <div className="swiper-slide-div-calorie-view-page">
                    <div className="meal-lottie-calorie-view-page">
                      <dotlottie-player
                        src="https://lottie.host/fa6adfff-9fa3-4014-9be3-a3b8b8a5061e/jV4o3gim0B.lottie"
                        background="transparent"
                        speed="1"
                        style={{ height: "200px", width: "200px" }}
                        loop
                        autoplay
                      ></dotlottie-player>
                    </div>
                    <div className="day-wise-calorie-view-calorie-view-page">
                      {singleDayMenu.slots.map((singleSlot) => (
                        <div className="single-day-calorie-view-page">
                          {singleSlot.slot}
                          <div className="single-slot-calorie-view-page">
                            {singleSlot.menuItems.map((singleMenuItem) => (
                              <div>
                                <img
                                  height="100"
                                  width="100"
                                  src={singleMenuItem.image}
                                  alt="menu Image"
                                  srcset=""
                                />
                                <p>{singleMenuItem.title}</p>
                                <p>
                                  {singleMenuItem.calorie.amount} cal per{" "}
                                  {singleMenuItem.calorie.unit}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </>
  );
}

export default CalorieViewPage;
