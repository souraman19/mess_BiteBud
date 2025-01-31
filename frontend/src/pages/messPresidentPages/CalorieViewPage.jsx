import React, { useState, useEffect } from "react";
import Navbar from "./../../components/commonComponents/Navbar.jsx";
import { GET_MESS_MENU } from "./../../utils/ApiRoutes.js";
import axios from "axios";
import { useStateProvider } from "../../context/StateContext";
import "./../../styles/CalorieViewPage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import PieChartSlide from "../../components/commonComponents/PieChartSlide.jsx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./../../styles/CommentSegment.css";
import "swiper/swiper-bundle.css";

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import { width } from "@mui/system";

const week_days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const sampledata = [
  { name: "Rent", value: 15000 },
  { name: "Groceries", value: 8000 },
  { name: "Utilities", value: 4000 },
  { name: "Transportation", value: 3000 },
  { name: "Entertainment", value: 2000 },
];

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

  const [allTotalExpensesInWeek, setAllTotalExpensesInWeek] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(GET_MESS_MENU, {
      params: { hostel },
      withCredentials: true,
    });
    setAllMenus(response.data);
    let tempAllTotalExpensesInWeek = [];
    //console.log("zkhdvcjvj????????????", response.data);
    const gotMenus = response.data;
    let tempDaySlotWiseMenu = [];
    let tempDaySlotWiseCalorieCount = [];
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
      let checkIfDayExistCalorie = tempDaySlotWiseCalorieCount.find(
        (item) => item.day === day
      );
      if (!checkIfDayExistCalorie) {
        checkIfDayExistCalorie = {
          day: day,
          slots: [],
        };
        tempDaySlotWiseCalorieCount.push(checkIfDayExistCalorie);
      }

      let checkIfDayExistWeek = tempAllTotalExpensesInWeek.find(
        (item) => item.day === day
      );
      if (!checkIfDayExistWeek) {
        checkIfDayExistWeek = {
          day: day,
          calorie: 0,
        };
        tempAllTotalExpensesInWeek.push(checkIfDayExistWeek);
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

      let checkIfSlotExistsCalorie = checkIfDayExistCalorie.slots.find(
        (item) => item.name === slot
      );
      if (!checkIfSlotExistsCalorie) {
        checkIfSlotExistsCalorie = {
          name: slot,
          value: 0,
        };
        checkIfDayExistCalorie.slots.push(checkIfSlotExistsCalorie);
      }
      checkIfSlotExistsCalorie.value += calorie.calorie_intake;
      checkIfDayExistWeek.calorie += calorie.calorie_intake;
    });
    // console.log("sm", tempDaySlotWiseMenu);

    tempDaySlotWiseCalorieCount.sort((a, b) => {
      const day_a = a.day;
      const day_b = b.day;
      const index_a = week_days.findIndex((day) => day === day_a);
      const index_b = week_days.findIndex((day) => day === day_b);
      return index_a - index_b;
    });

    tempAllTotalExpensesInWeek.sort((a, b) => {
      const day_a = a.day;
      const day_b = b.day;
      const index_a = week_days.findIndex((day) => day === day_a);
      const index_b = week_days.findIndex((day) => day === day_b);
      return index_a - index_b;
    });

    setDaySlotWiseCalorieCount(tempDaySlotWiseCalorieCount);
    setAllTotalExpensesInWeek(tempAllTotalExpensesInWeek);
    // console.log("sm43", tempAllTotalExpensesInWeek);
    // console.log("sm44", tempDaySlotWiseCalorieCount[0].slots);
    // console.log("sm5", tempDataForPieChart[0][1]);

    tempDaySlotWiseMenu.sort((a, b) => {
      const day_a = a.day;
      const day_b = b.day;
      const index_a = week_days.findIndex((day) => day === day_a);
      const index_b = week_days.findIndex((day) => day === day_b);

      return index_a - index_b;
    });
    // console.log("sm3", tempDaySlotWiseMenu);

    // setStructuredCalorieDataForPieChart(tempDataForPieChart);
    setDaySlotWiseMenu(tempDaySlotWiseMenu);
    // console.log("Mess menu fetched successfully", gotMenus);
    console.log("Mess menu fetched successfully");
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log("dayslt", daySlotWiseMenu);
  }, [daySlotWiseMenu]);

  // useEffect(()=>{
  //   console.log("sm4", structuredCalorieDataForPieChart[0][1]);
  //   console.log("sm5", structuredCalorieDataForPieChart);
  // }, [structuredCalorieDataForPieChart])

  return (
    <>
      <Navbar />
      <div className="outermost-div-calorie-chart-view-page">
        <div className="first-upper-block-calorie-chart-view-page">
          <div className="heading-calorie-chart-view-page">
            See daily calorie intake per meal
          </div>
          <div className="first-upper-block-inner-div-calorie-chart-view-page">
            {daySlotWiseMenu.length > 0 && (
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                freeMode={true}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                autoHeight={true}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                // autoplay={{
                //   delay: 10000,
                //   disableOnInteraction: true,
                // }}
                className="mySwiper"
              >
                {daySlotWiseMenu.map((singleDayMenu, index) => {
                  // console.log("se", selectedIndex);
                  return (
                    <SwiperSlide
                      key={singleDayMenu.day}
                      className="swiper-slide-calorie-view-page"
                    >
                      Day: {singleDayMenu.day}
                      <div className="swiper-slide-div-calorie-view-page">
                        <div className="meal-lottie-calorie-view-page">
                          {daySlotWiseCalorieCount.length > 0 && (
                            <div>
                              <PieChartSlide
                                data={daySlotWiseCalorieCount[index].slots}
                                heading={""}
                                unit=" cal"
                              />
                            </div>
                          )}
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
        </div>
        <div className="second-upper-block-calorie-chart-view-page">  
            {allTotalExpensesInWeek.length > 0 && (
              <div>
              <h2 className="anydayExpense_heading">Daywise calorie barplot</h2>
              <div className="bar-graph-container">
                {allTotalExpensesInWeek.map((weekData) => {
                  const maxCalorie = Math.max(
                    ...allTotalExpensesInWeek.map((item) => item.calorie)
                  );
                  const barHeight = (weekData.calorie / maxCalorie) * 100;
                  // console.log(monthData.month, " ", `${100-barHeight}%`);
                  return (
                    <div key={weekData.day} className="bar-container">
                      <div className="bar">
                        <div
                          className="bar-empty-part"
                          style={{ height: `${100-barHeight}%` }}
                        >
                          
                        </div>
                        <div
                          className="bar-fill-part"
                          style={{ height: `${barHeight}%` }}
                        >
                          
                        </div>
                      </div>
                      <span className="month-label">{weekData.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CalorieViewPage;
