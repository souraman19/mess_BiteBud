import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useUser } from "./../../UserContext";
import "./../../styles/patelfullmenu.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";

function Patelfullmenu() {
  const { user } = useUser();
  const hostel = user.hostel;
  const [allMenus, setAllMenus] = useState([]);
  const [mealDay, setMealDay] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [mealName, setMealName] = useState("");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
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
    "Thrusday",
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/getmessmenu");
      setAllMenus(response.data);
      console.log("zkhdvcjvj????????????", response.data);
      console.log("Mess menu fetched successfully");
    };
    fetchData();
  }, []);

  const handleDelete = async (day, mealTime, mealName) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/deletemessmenu",
        { params: { day, mealTime, mealName } }
      );
      console.log(response);
      setTimeout(() => {
        setAllMenus(response.data);
        console.log("Updated Mess menu fetched successfully after deletion");
      }, 1000);
    } catch (err) {
      console.error("error in deleteing meal ", err);
    }
  };

  const handleEdit = (day, mealTime, mealName) => {
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

  const handleConfirmEdit = async(day, mealTime, mealName) => {
    try {
      const data = {day: day, mealTime: mealTime, mealName: mealName, newMealName: foodName};
      const response = await axios.post("http://localhost:5000/api/editmealname", data);
      setTimeout(() => {
        setAllMenus(response.data.updatedMenus);
        console.log("menu updated after edit");
      }, 1000);

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
    // console.log(mealDay, mealTime, mealName);

    // console.log("FormData entries:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addnewmeal",
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

      setTimeout(async () => {
        const updatedMenu = await axios.get(
          "http://localhost:5000/api/getmessmenu"
        );
        setAllMenus(updatedMenu.data);
      }, 2000);
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
                    {allMenus[index].allFoodItems
                        .filter((meal) => meal.time === "Breakfast")
                        .map((meal, idx) => (
                          <li key={idx} >
                            <div
                              id={`inputblock_${day}${meal.time}${meal.name}`}
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
                                  onClick = {() => handleConfirmEdit(day, meal.time, meal.name)}
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
                                  onClick = {() => handleCancelEdit(day, meal.time, meal.name)}
                                />
                              </div>
                            </div>

                            <div
                              id={`realblock_${day}${meal.time}${meal.name}`}
                              className="box_with_name_two_button_display"
                            >
                              <DeleteIcon
                                className="delete-icon"
                                onClick={() =>
                                  handleDelete(day, meal.time, meal.name)
                                }
                              />
                              <div>{meal.name}</div>
                              <EditIcon
                                className="edit-icon"
                                onClick={() =>
                                  handleEdit(day, meal.time, meal.name)
                                }
                              />
                            </div>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td id={`day_box3${day}`} className="">
                    <ul>
                      {allMenus[index].allFoodItems
                        .filter((meal) => meal.time === "Lunch")
                        .map((meal, idx) => (
                          <li key={idx}>
                            <div
                              id={`inputblock_${day}${meal.time}${meal.name}`}
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
                                  onClick = {() => handleConfirmEdit(day, meal.time, meal.name)}
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
                                  onClick = {() => handleCancelEdit(day, meal.time, meal.name)}
                                />
                              </div>
                            </div>

                            <div
                              id={`realblock_${day}${meal.time}${meal.name}`}
                              className="box_with_name_two_button_display"
                            >
                              <DeleteIcon
                                className="delete-icon"
                                onClick={() =>
                                  handleDelete(day, meal.time, meal.name)
                                }
                              />
                              <div>{meal.name}</div>
                              <EditIcon
                                className="edit-icon"
                                onClick={() =>
                                  handleEdit(day, meal.time, meal.name)
                                }
                              />
                            </div>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td id={`day_box4${day}`} className="">
                    <ul>
                    {allMenus[index].allFoodItems
                        .filter((meal) => meal.time === "Snacks")
                        .map((meal, idx) => (
                          <li key={idx}>
                            <div
                              id={`inputblock_${day}${meal.time}${meal.name}`}
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
                                  onClick = {() => handleConfirmEdit(day, meal.time, meal.name)}
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
                                  onClick = {() => handleCancelEdit(day, meal.time, meal.name)}
                                />
                              </div>
                            </div>

                            <div
                              id={`realblock_${day}${meal.time}${meal.name}`}
                              className="box_with_name_two_button_display"
                            >
                              <DeleteIcon
                                className="delete-icon"
                                onClick={() =>
                                  handleDelete(day, meal.time, meal.name)
                                }
                              />
                              <div>{meal.name}</div>
                              <EditIcon
                                className="edit-icon"
                                onClick={() =>
                                  handleEdit(day, meal.time, meal.name)
                                }
                              />
                            </div>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td id={`day_box5${day}`} className="">
                    <ul>
                    {allMenus[index].allFoodItems
                        .filter((meal) => meal.time === "Dinner")
                        .map((meal, idx) => (
                          <li key={idx}>
                            <div
                              id={`inputblock_${day}${meal.time}${meal.name}`}
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
                                  onClick = {() => handleConfirmEdit(day, meal.time, meal.name)}
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
                                  onClick = {() => handleCancelEdit(day, meal.time, meal.name)}
                                />
                              </div>
                            </div>

                            <div
                              id={`realblock_${day}${meal.time}${meal.name}`}
                              className="box_with_name_two_button_display"
                            >
                              <DeleteIcon
                                className="delete-icon"
                                onClick={() =>
                                  handleDelete(day, meal.time, meal.name)
                                }
                              />
                              <div>{meal.name}</div>
                              <EditIcon
                                className="edit-icon"
                                onClick={() =>
                                  handleEdit(day, meal.time, meal.name)
                                }
                              />
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
      {hostel === "hostel" && (
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
