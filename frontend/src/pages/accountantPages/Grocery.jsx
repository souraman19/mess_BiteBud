import React, { useEffect, useState } from "react";
import "./../../styles/Grocery.css";
import Rating from "@mui/material/Rating";
import Navbar from "./../../components/commonComponents/Navbar.jsx";
import {
  ADD_GROCERY_ITEM,
  GET_GROCERY_ITEMS,
  ADD_NEW_VENDOR,
  GET_VENDORS,
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
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";

function Grocery() {
  const [{ userInfo }] = useStateProvider();
  const hostel = userInfo.hostel;

  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [allItems, setAllItems] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    country: "",
    state: "",
    pin: "",
    nearestCity: "",
    streetAddress: "",
  });
  const [phoneNo, setPhoneNo] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [vendors, setVendors] = useState([]);

  const countryCodeList = [
    { code: "+1", name: "United States" },
    { code: "+91", name: "India" },
    { code: "+44", name: "United Kingdom" },
    { code: "+81", name: "Japan" },
    { code: "+61", name: "Australia" },
  ];

  const fetchItems = async () => {
    try {
      const response = await axios.get(GET_GROCERY_ITEMS, {
        params: { hostel: hostel },
        withCredentials: true,
      });
      setAllItems(response.data.items);
      // console.log("res => ", allItems);
    } catch (err) {
      console.log("Error in fetching grocery items", err);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get(GET_VENDORS, {
        params: { hostel },
        withCredentials: true,
      });
      setVendors(response.data.allVendors);
      console.log("vndors ", vendors);
    } catch (err) {
      console.log("Error in fetching the vendors", err);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchVendors();
  }, []);

  const handleGroceryItemSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ADD_GROCERY_ITEM, {
        itemName: itemName,
        category: category,
        hostel: hostel,
      }, {withCredentials: true});
      console.log("Grocery item added successfully");
      setItemName("");
      setCategory("");
      fetchItems();
    } catch (err) {
      console.error("Error adding grocery item:", err);
    }
  };

  const handleVendorDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ADD_NEW_VENDOR, {
        name: name,
        address: address,
        phone: {
          countryCode,
          phoneNo,
        },
        hostel: hostel,
      });
      setName("");
      setAddress({
        country: "",
        state: "",
        pin: "",
        nearestCity: "",
        streetAddress: "",
      });
      setPhoneNo("");
      setCountryCode("");
      fetchVendors();
    } catch (err) {
      console.error("Error in adding new vendor", err);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="outermost-container-grocery-page">
        <div className="grocery-item-container">
          <div className="anydayExpense_heading">Add New Groceries</div>
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
                  <option value="" disabled hidden>
                    Category
                  </option>
                  <option value="Staples & Grains">Staples & Grains</option>
                  <option value="Cooking Oils & Fats">
                    Cooking Oils & Fats
                  </option>
                  <option value="Vegetables & Fruits">
                    Vegetables & Fruits
                  </option>
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
            <div  className="anydayExpense_heading">Existing Grocery Items</div>
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
                        src={item.itemImage}
                        alt="Grocery item"
                        className="item-image"
                      />
                      <h2>{item.name}</h2>
                      <p>Category: {item.category}</p>
                      <div>
                        <Rating value={item.averageRating} readOnly />
                        <p>( {item.buyCount} )</p>
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
            style={{ width:"300px", height: "300px"}}
            loop
            autoplay
          ></dotlottie-player>
          <p className="no-expense-message">
            No item found. Add now!
          </p>
        </div>
            )}
          </div>
        </div>

        <div className="vendor-container">
          <div className="form-container">
          <div className="anydayExpense_heading">Add New Vendors</div>
            <form onSubmit={handleVendorDetailsSubmit} className="grocery-form">
              <div>
                <label htmlFor="vendor-name">Vendor Name</label>
                <input
                  type="text"
                  placeholder="Enter Vendor Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  placeholder="Enter Country"
                  name="country"
                  value={address.country}
                  required
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  placeholder="Enter State"
                  name="state"
                  value={address.state}
                  required
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <label htmlFor="pin">Pin</label>
                <input
                  type="number"
                  placeholder="Enter Pin Code"
                  name="pin"
                  value={address.pin}
                  required
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <label htmlFor="nearest-city">Nearest City</label>
                <input
                  type="text"
                  placeholder="Enter Nearest City"
                  name="nearestCity"
                  value={address.nearestCity}
                  required
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <label htmlFor="street-address">Street Address</label>
                <input
                  type="text"
                  placeholder="Enter Street Address"
                  name="streetAddress"
                  value={address.streetAddress}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <label htmlFor="phone-no">Phone Number</label>
                <select
                  name="country-code"
                  id="country-code"
                  required
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="" hidden disabled>
                    Select Country Code
                  </option>
                  {countryCodeList.map((code, index) => (
                    <option key={index} value={code.code}>
                      {code.name} ({code.code})
                    </option>
                  ))}
                </select>
                <input
                  placeholder="Enter Phone Number"
                  value={phoneNo}
                  required
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="swiper-container">
            <div  className="anydayExpense_heading">Existing Vendors</div>
            {vendors.length > 0 ? (
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
                {vendors.map((vendor, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <div className="item-card">
                      <img
                        height="70"
                        width="70"
                        src={vendor.vendorImage}
                        alt="Grocery item"
                        className="item-image"
                      />
                      <h2>{vendor.name}</h2>
                      <div>
                        <p>{vendor.phone.countryCode} {vendor.phone.phoneNo}</p>
                        <Rating value={vendor.averageRating} readOnly />
                        <p>( {vendor.buyCount} )</p>
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
            style={{ width:"300px", height: "300px"}}
            loop
            autoplay
          ></dotlottie-player>
          <p className="no-expense-message">
            No vendor found. Add now!
          </p>
        </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grocery;
