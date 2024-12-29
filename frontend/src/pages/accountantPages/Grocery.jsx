import React, { useEffect, useState } from "react";
import "./../../styles/Grocery.css";
import Navbar from "./../../components/commonComponents/Navbar.jsx";
import {
  ADD_GROCERY_ITEM,
  GET_GROCERY_ITEMS,
} from "./../../utils/ApiRoutes.js";
import axios from "axios";
import { useStateProvider } from "./../../context/StateContext.jsx";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./../../styles/CommentSegment.css";
import "swiper/swiper-bundle.css";

// import required modules
import { FreeMode, Pagination, Navigation,Autoplay } from "swiper/modules";
import SwiperCore from "swiper";

// Initiate SwiperCore
SwiperCore.use([FreeMode, Pagination]);

function Grocery() {
  const [{ userInfo }] = useStateProvider();
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [allItems, setAllItems] = useState([]);

  const hostel = userInfo.hostel;

  const fetchData = async () => {
    try {
      const response = await axios.get(GET_GROCERY_ITEMS, {
        params: { hostel: hostel },
        withCredentials: true,
      });
      setAllItems(response.data.items);
    } catch (err) {
      console.log("Error in fetching grocery items", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGroceryItemSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ADD_GROCERY_ITEM, {
        itemName: itemName,
        category: category,
        hostel: hostel,
      });
      console.log("Grocery item added successfully");
      setItemName("");
      setCategory("");
      fetchData();
    } catch (err) {
      console.error("Error adding grocery item:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="outermost-container-grocery-page">
        <div className="form-container">
          <form onSubmit={handleGroceryItemSubmit} className="grocery-form">
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
              <label htmlFor="category-selection">Select Category</label>
              <select
                name="category"
                id="category-selection"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled selected hidden>
                  Category
                </option>
                <option value="Staples & Grains">Staples & Grains</option>
                <option value="Staples & Grains">Staples & Grains</option>
                <option value="Cooking Oils & Fats">Cooking Oils & Fats</option>
                <option value="Vegetables & Fruits">Vegetables & Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Snacks & Beverages">Snacks & Beverages</option>
                <option value="Sweets & Desserts">Sweets & Desserts</option>
                <option value="Packaged Goods">Packaged Goods</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="swiper-container">
          <h2>Grocery Items</h2>
          {allItems.length > 0 ? (
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              freeMode={true}
              navigation= {true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation, FreeMode,Autoplay]}
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
                      src={item.itemImage}
                      alt="this is a grocery item image"
                      className="item-image"
                    />
                    <h2>{item.name}</h2>
                    <p>Category: {item.category}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Grocery;
