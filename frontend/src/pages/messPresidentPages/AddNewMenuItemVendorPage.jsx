import React, { useEffect, useState } from "react";
import "./../../styles/Grocery.css";
import Rating from "@mui/material/Rating";
import Navbar from "../../components/commonComponents/Navbar.jsx";
import {
  ADD_GROCERY_ITEM,
  GET_GROCERY_ITEMS,
  ADD_NEW_VENDOR,
  GET_VENDORS,
  ADD_MENU_ITEM,
  ADD_MESS_WORKER,
  GET_MESS_WORKER,
  GET_MENU_ITEM,
} from "../../utils/ApiRoutes.js";
import axios from "axios";
import { useStateProvider } from "../../context/StateContext.jsx";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./../../styles/CommentSegment.css";
import "swiper/swiper-bundle.css";

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";

function AddNewMenuItemVendorPage() {
  const [{ userInfo }] = useStateProvider();
  const hostel = userInfo.hostel;

  const [calorie, setCalorie] = useState("");
  const [caloriePerUnit, setCaloriePerUnit] = useState("");
  const [itemName, setItemName] = useState("");
  const [allItems, setAllItems] = useState([]);




  const fetchItems = async () => {
    try {
      const response = await axios.get(GET_MENU_ITEM, {
        params: { hostel: hostel },
        withCredentials: true,
      });
      setAllItems(response.data.items);
      // console.log("res => ", allItems);
    } catch (err) {
      console.log("Error in fetching grocery items", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleMenuItemSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        ADD_MENU_ITEM,
        {
          itemName: itemName,
          calorie: calorie,
          caloriePerUnit: caloriePerUnit,
          hostel: hostel,
        },
        { withCredentials: true }
      );
      console.log("Grocery item added successfully");
      setItemName("");
      setCalorie("");
      setCaloriePerUnit("");
      fetchItems();
    } catch (err) {
      console.error("Error adding grocery item:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="outermost-container-grocery-page">
        <div className="grocery-item-container">
          <div className="anydayExpense_heading">Add New Menu Items</div>
          <div className="form-container">
            <form onSubmit={handleMenuItemSubmit} className="grocery-form">
              <div>
                <label htmlFor="item-name">Item name</label>
                <input
                  type="text"
                  placeholder="Enter Item Name"
                  value={itemName}
                  required
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="calorie-amount">Calorie Amount</label>
                <input
                  type="text"
                  placeholder="Enter Calorie Amount"
                  value={calorie}
                  required
                  onChange={(e) => setCalorie(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="calorie-amount-per-unit">
                  Calorie Count Per-{" "}
                </label>
                <select
                  value={caloriePerUnit}
                  required
                  onChange={(e) => setCaloriePerUnit(e.target.value)}
                >
                  <option value="">Select Unit</option>
                  <option value="gram">Gram</option>
                  <option value="ounce">Ounce</option>
                  <option value="kilogram">Kilogram</option>
                  <option value="pound">Pound</option>
                  <option value="milliliter">Milliliter</option>
                  <option value="liter">Liter</option>
                  <option value="cup">Cup</option>
                  <option value="piece">Piece</option>
                </select>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>

          <div className="swiper-container">
            <div className="anydayExpense_heading">Existing Menu Items</div>
            {allItems.length > 0 ? (
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation, FreeMode, Autoplay]}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: true,
                }}
                className="mySwiper"
              >
                {allItems.map((item, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <div className="item-card">
                      <img
                        height="70"
                        width="70"
                        src={item.image}
                        alt="Grocery item"
                        className="item-image"
                      />
                      <h2>{item.title}</h2>
                      <div>
                        <Rating value={item.averageRating} readOnly />
                        <p>(Calorie: {item.calorie.amount} per {item.calorie.unit} )</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="empty-expense-section">
                <dotlottie-player
                  src="https://lottie.host/97a9b4e6-6ab2-4b73-ae71-1b044a633b01/TRe6Jrifl1.lottie"
                  background="transparent"
                  speed="1"
                  style={{ width: "300px", height: "300px" }}
                  loop
                  autoplay
                ></dotlottie-player>
                <p className="no-expense-message">
                  No mess item found. Add now!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewMenuItemVendorPage;
