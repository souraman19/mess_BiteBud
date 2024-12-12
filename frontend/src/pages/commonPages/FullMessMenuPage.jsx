import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/commonComponents/Navbar";
import { useStateProvider } from "../../context/StateContext";
import "./../../styles/FullMessMenuPage.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
// import { Button, IconButton } from "@mui/material";
import {GET_MESS_MENU, ADD_MESS_MENU, EDIT_MESS_MENU, DELETE_MESS_MENU} from "./../../utils/ApiRoutes.js";

function Patelfullmenu() {
  const [{ userInfo }] = useStateProvider();
  const userId = userInfo.userId;
  const username = userInfo.username;
  const hostel = userInfo.hostel;
  const name = userInfo.firstName;
  const userType = userInfo.userType;

  const [allMenus, setAllMenus] = useState([]);
  const [mealDay, setMealDay] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [mealName, setMealName] = useState("");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];


  const currentDayIndex = new Date().getDay();
  const Alldays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = Alldays[currentDayIndex];

  if(allMenus.length > 0){
    const el1 = document.getElementById(`day_box1${currentDay}`)
    const el2 = document.getElementById(`day_box2${currentDay}`)
    const el3 = document.getElementById(`day_box3${currentDay}`)
    const el4 = document.getElementById(`day_box4${currentDay}`)
    const el5 = document.getElementById(`day_box5${currentDay}`)
    setTimeout(()=> {
      el1?.classList?.add("today_meal_effect");
    el2?.classList?.add("today_meal_effect");
    el3?.classList?.add("today_meal_effect");
    el4?.classList?.add("today_meal_effect");
    el5?.classList?.add("today_meal_effect");
    }, 500);
  }

  const [foodName, setFoodName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(GET_MESS_MENU, {params: {hostel}, withCrediantials: true});
    setAllMenus(response.data);
    console.log("zkhdvcjvj????????????", response.data);
    console.log("Mess menu fetched successfully");
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (menuId) => {
    try {
      const response = await axios.delete(
        DELETE_MESS_MENU,
        { params: { menuId } }
      );
      fetchData();
    } catch (err) {
      console.error("error in deleteing meal ", err);
    }
  };

  const handleEdit = (day, mealTime, mealName, mealId) => {
    setIsEditing(true);
    setFoodName(mealName);
    const a = document.getElementById(`realblock_${day}${mealTime}${mealName}`); //with real box
    const b = document.getElementById(
      `inputblock_${day}${mealTime}${mealName}`
    ); 
    a.classList.remove("box_with_name_two_button_display");
    a.classList.add("none_display");

    b.classList.remove("none_display");
    b.classList.add("block_display");
    b.classList.add("input_box_with_btn");
  };

  const handleCancelEdit = (day, mealTime, mealName) => {
    setIsEditing(false);
    const a = document.getElementById(`realblock_${day}${mealTime}${mealName}`); //with real box
    const b = document.getElementById(
      `inputblock_${day}${mealTime}${mealName}`
    ); 
    b.classList.remove("block_display");
    b.classList.remove("input_box_with_btn");
    b.classList.add("none_display");

    a.classList.remove("none_display");
    a.classList.add("box_with_name_two_button_display");
  }

  const handleConfirmEdit = async(day, mealTime, mealName, menuId) => {
    try {
      const data = {menuId: menuId, newMealName: foodName};
      const response = await axios.post(EDIT_MESS_MENU, data);
      fetchData();

      setIsEditing(false);
    const a = document.getElementById(`realblock_${day}${mealTime}${mealName}`); //with real box
    const b = document.getElementById(
      `inputblock_${day}${mealTime}${mealName}`
    ); 
    b.classList.remove("block_display");
    b.classList.remove("input_box_with_btn");
    b.classList.add("none_display");

    a.classList.remove("none_display");
    a.classList.add("box_with_name_two_button_display");

    }catch(error){
      console.error("Error in editing meal ", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    const formData = new URLSearchParams(); 
    formData.append("day", mealDay);
    // alert(mealDay);
    formData.append("mealTime", mealTime);
    formData.append("name", mealName);
    formData.append("hostel", hostel);

    // console.log(mealDay, mealTime, mealName);

    // console.log("FormData entries:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    try {
      const response = await axios.post(
        ADD_MESS_MENU,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("response data ", response.data);
      setMealDay("");
      setMealTime("");
      setMealName("");
      document.getElementById("daySelection").selectedIndex = 0;
      document.getElementById("timeSelection").selectedIndex = 0;

      fetchData();
    } catch (error) {
      console.log("Error in adding meal:", error);
    }
  };

  return (
    <div className="Patel_full_menu_outermost_div">
      <Navbar />
      <div className="menu-table-div">
        {allMenus.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>
                  <ul>
                    <li>Breakfast</li>
                    <li>7:45 am - 9:00 am</li>
                  </ul>
                </th>
                <th>
                  <ul>
                    <li>Lunch</li>
                    <li>12:15 pm - 2:00 pm</li>
                  </ul>
                </th>
                <th>
                  <ul>
                    <li>Snacks</li>
                    <li>5:30 pm - 6:30 pm</li>
                  </ul>
                </th>
                <th>
                  <ul>
                    <li>Dinner</li>
                    <li>7:45 pm - 9:00 pm</li>
                  </ul>
                </th>
              </tr>
            </thead>
            <tbody>
              {days.map((day, index) => (
                <tr key={index}>
                  <td className="which-day" id={`day_box1${day}`}>{day}</td>
                  <td id={`day_box2${day}`} className="">
                    <ul>
                    {allMenus
                        .filter((meal) => meal.slot === "Breakfast" && meal.day === day)
                        .map((meal, idx) => (
                          <li key={idx} >
                            <div
                              id={`inputblock_${day}${meal.slot}${meal.menuItem.title}`}
                              className="none_display"
                              // className="block_display input_box_with_btn" will be added when edit button is clicked
                            >
                              <div className="input_div">
                                <input
                                  type="text"
                                  value={foodName}
                                  onChange={(e) => setFoodName(e.target.value)}
                                />
                              </div>
                              <div className="close_confirm_button">
                                <CheckIcon
                                  style={{
                                    height: "2.5rem",
                                    width: "2.5rem",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                  }}
                                  onClick = {() => handleConfirmEdit(day, meal.slot, meal.menuItem.title, meal.menuId)}
                                />
                                <CloseIcon
                                  style={{
                                    height: "2.5rem",
                                    width: "2.5rem",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                  }}
                                  onClick = {() => handleCancelEdit(day, meal.slot, meal.menuItem.title)}
                                />
                              </div>
                            </div>

                            <div
                              id={`realblock_${day}${meal.slot}${meal.menuItem.title}`}
                              className="box_with_name_two_button_display"
                            >
                              {
                                userType === "Student" && (
                                  <DeleteIcon
                                className="delete-icon"
                                onClick={() =>
                                  handleDelete(meal.menuId)
                                }
                              />
                                )
                              }
                              <div>{meal.menuItem.title}</div>
                              {
                                userType === "Student" && (
                                  <EditIcon
                                className="edit-icon"
                                onClick={() =>
                                  handleEdit(day, meal.slot, meal.menuItem.title, meal.menuId)
                                }
                              />
                                )
                              }
                            </div>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td id={`day_box3${day}`} className="">
                    <ul>
                      {allMenus
                        .filter((meal) => meal.slot === "Lunch" && meal.day === day)
                        .map((meal, idx) => (
                          <li key={idx}>
                            <div
                              id={`inputblock_${day}${meal.slot}${meal.menuItem.title}`}
                              className="none_display"
                              // className="block_display input_box_with_btn" will be added when edit button is clicked
                            >
                              <div className="input_div">
                                <input
                                  type="text"
                                  value={foodName}
                                  onChange={(e) => setFoodName(e.target.value)}
                                />
                              </div>
                              <div className="close_confirm_button">
                                <CheckIcon
                                  style={{
                                    height: "2.5rem",
                                    width: "2.5rem",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                  }}
                                  onClick = {() => handleConfirmEdit(day, meal.slot, meal.menuItem.title, meal.menuId)}
                                />
                                <CloseIcon
                                  style={{
                                    height: "2.5rem",
                                    width: "2.5rem",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                  }}
                                  onClick = {() => handleCancelEdit(day, meal.slot, meal.menuItem.title)}
                                />
                              </div>
                            </div>

                            <div
                              id={`realblock_${day}${meal.slot}${meal.menuItem.title}`}
                              className="box_with_name_two_button_display"
                            >
                               {
                                userType === "Student" && (
                                  <DeleteIcon
                                className="delete-icon"
                                onClick={() =>
                                  handleDelete(meal.menuId)
                                }
                              />
                                )
                              }
                              <div>{meal.menuItem.title}</div>
                              {
                                userType === "Student" && (
                                  <EditIcon
                                className="edit-icon"
                                onClick={() =>
                                  handleEdit(day, meal.slot, meal.menuItem.title, meal.menuId)
                                }
                              />
                                )
                              }
                            </div>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td id={`day_box4${day}`} className="">
                    <ul>
                    {allMenus
                        .filter((meal) => meal.slot === "Snacks" && meal.day === day)
                        .map((meal, idx) => (
                          <li key={idx}>
                            <div
                              id={`inputblock_${day}${meal.slot}${meal.menuItem.title}`}
                              className="none_display"
                              // className="block_display input_box_with_btn" will be added when edit button is clicked
                            >
                              <div className="input_div">
                                <input
                                  type="text"
                                  value={foodName}
                                  onChange={(e) => setFoodName(e.target.value)}
                                />
                              </div>
                              <div className="close_confirm_button">
                                <CheckIcon
                                  style={{
                                    height: "2.5rem",
                                    width: "2.5rem",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                  }}
                                  onClick = {() => handleConfirmEdit(day, meal.slot, meal.menuItem.title, meal.menuId)}
                                />
                                <CloseIcon
                                  style={{
                                    height: "2.5rem",
                                    width: "2.5rem",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                  }}
                                  onClick = {() => handleCancelEdit(day, meal.slot, meal.menuItem.title)}
                                />
                              </div>
                            </div>

                            <div
                              id={`realblock_${day}${meal.slot}${meal.menuItem.title}`}
                              className="box_with_name_two_button_display"
                            >
                               {
                                userType === "Student" && (
                                  <DeleteIcon
                                className="delete-icon"
                                onClick={() =>
                                  handleDelete(meal.menuId)
                                }
                              />
                                )
                              }
                              <div>{meal.menuItem.title}</div>
                              {
                                userType === "Student" && (
                                  <EditIcon
                                className="edit-icon"
                                onClick={() =>
                                  handleEdit(day, meal.slot, meal.menuItem.title, meal.menuId)
                                }
                              />
                                )
                              }
                            </div>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td id={`day_box5${day}`} className="">
                    <ul>
                    {allMenus
                        .filter((meal) => meal.slot === "Dinner" && meal.day === day)
                        .map((meal, idx) => (
                          <li key={idx}>
                            <div
                              id={`inputblock_${day}${meal.slot}${meal.menuItem.title}`}
                              className="none_display"
                              // className="block_display input_box_with_btn" will be added when edit button is clicked
                            >
                              <div className="input_div">
                                <input
                                  type="text"
                                  value={foodName}
                                  onChange={(e) => setFoodName(e.target.value)}
                                />
                              </div>
                              <div className="close_confirm_button">
                                <CheckIcon
                                  style={{
                                    height: "2.5rem",
                                    width: "2.5rem",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                  }}
                                  onClick = {() => handleConfirmEdit(day, meal.slot, meal.menuItem.title, meal.menuId)}
                                />
                                <CloseIcon
                                  style={{
                                    height: "2.5rem",
                                    width: "2.5rem",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    padding: "0.5rem",
                                    cursor: "pointer",
                                  }}
                                  onClick = {() => handleCancelEdit(day, meal.slot, meal.menuItem.title)}
                                />
                              </div>
                            </div>

                            <div
                              id={`realblock_${day}${meal.slot}${meal.menuItem.title}`}
                              className="box_with_name_two_button_display"
                            >
                               {
                                userType === "Student" && (
                                  <DeleteIcon
                                className="delete-icon"
                                onClick={() =>
                                  handleDelete(meal.menuId)
                                }
                              />
                                )
                              }
                              <div>{meal.menuItem.title}</div>
                              {
                                userType === "Student" && (
                                  <EditIcon
                                className="edit-icon"
                                onClick={() =>
                                  handleEdit(day, meal.slot, meal.menuItem.title, meal.menuId)
                                }
                              />
                                )
                              }
                            </div>
                          </li>
                        ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading Menu Table ...</p>
        )}
      </div>
      {userType === "Student" && (
        <div className="add_menu_div">
          <h2>Add new meal</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="daySelection_div">
              <label htmlFor="daySelection">Day</label>
              <select
                name="day"
                id="daySelection"
                onChange={(e) => setMealDay(e.target.value)}
                value={mealDay}
                required
              >
                <option value="" disabled selected hidden>
                  Select a day
                </option>
                {days.map((day, index) => (
                  <option value={day} key={index}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="timeSelection_div">
              <label htmlFor="timeSelection">Meal Time</label>
              <select
                name="mealTime"
                id="timeSelection"
                onChange={(e) => setMealTime(e.target.value)}
                value={mealTime}
                required
              >
                <option value="" disabled selected hidden>
                  Select a time
                </option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snacks">Snacks</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            {/* <label>
              Select image
              <input
                type="file"
                name="mealImage"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </label> */}
            <input
              type="text"
              name="mealName"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="Enter meal name"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Patelfullmenu;
