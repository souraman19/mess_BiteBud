import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useUser } from "./../../UserContext";
import "./../../styles/patelfullmenu.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Patelfullmenu() {
  const { user } = useUser();
  const hostel = user.hostel;
  const [allMenus, setAllMenus] = useState([]);
  const [mealDay, setMealDay] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [mealName, setMealName] = useState("");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [foodName, setFoodName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/getmessmenu");
      setAllMenus(response.data);
      console.log("Mess menu fetched successfully");
    };
    fetchData();
  }, []);

  const handleDelete = async (day, mealTime, mealName) => {
    try{
      const response = await axios.delete("http://localhost:5000/api/deletemessmenu", {params: {day, mealTime, mealName}
      });
      console.log(response);
      setTimeout(() => {
        setAllMenus(response.data);
        console.log("Updated Mess menu fetched successfully after deletion");
      }, 1000);
    } catch(err){
      console.error("error in deleteing meal ", err);
    }
  }

  // const handleEdit = async(day, mealTime, mealName) => {
  //   alert("Edit clicked");
  //   setIsEditing(true);
  //   setFoodName(mealName);
  //   const a = document.getElementById(`realblock_${day}${mealTime}${mealName}`);
  //   const b = document.getElementById(`inputblock_${day}${mealTime}${mealName}`);
  //   // console.log(a);
  //   // console.log(b);
  //   // console.log("done");
  //   a.classList.remove("special_display");
  //   a.classList.add("none_display");
  //   b.classList.remove("none_display");
  //   b.classList.add("block_display");
  //   // console.log(a);
  //   // console.log(b);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    const formData = new URLSearchParams();
    formData.append("day", mealDay);
    formData.append("mealTime", mealTime);
    formData.append("name", mealName);
    // console.log(mealDay, mealTime, mealName); 

    // console.log("FormData entries:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    try {
      const response = await axios.post("http://localhost:5000/api/addnewmeal", formData, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      console.log("response data ", response.data);
      setMealDay("");
      setMealTime("");
      setMealName("");
      document.getElementById("daySelection").selectedIndex = 0;
      document.getElementById("timeSelection").selectedIndex = 0;

      setTimeout(async () => {
        const updatedMenu = await axios.get("http://localhost:5000/api/getmessmenu");
        setAllMenus(updatedMenu.data);
      }, 2000);
    } catch (error) {
      console.log("Error in adding meal:", error);
    }
  };


  return (
    <div className="Patel_full_menu_outermost_div">
      <Navbar />
      <div className="menu-table-div" >
        {allMenus.length > 0 ? (
          <table >
            <thead>
              <tr>
                <th>Day</th>
                <th>
                  <ul>
                    <li >Breakfast</li>
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
                  <td className="which-day" >{day}</td>
                  <td>
                    <ul>
                      {allMenus[index].allFoodItems
                        .filter((meal) => meal.time === "Breakfast")
                        .map((meal, idx) => (
                          <li key={idx} >
                              <DeleteIcon className="delete-icon" onClick={() => handleDelete(day, meal.time, meal.name)}/>
                                <div>{meal.name}</div>
                              <EditIcon/>
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {allMenus[index].allFoodItems
                        .filter((meal) => meal.time === "Lunch")
                        .map((meal, idx) => (
                          <li key={idx}>
                            
                              <input 
                                type="text"
                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                                id={`inputblock_${day}${meal.time}${meal.name}`}
                                className="none_display"
                              />
                              <div id={`realblock_${day}${meal.time}${meal.name}`}
                                className="special_display"
                              >
                              <DeleteIcon className="delete-icon" onClick={() => handleDelete(day, meal.time, meal.name)}/>
                              <div>{meal.name}</div>
                              <EditIcon className="edit-icon" />
                            
                              </div>
                        
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {allMenus[index].allFoodItems
                        .filter((meal) => meal.time === "Snacks")
                        .map((meal, idx) => (
                          <li key={idx}>
                            <DeleteIcon className="delete-icon" onClick={() => handleDelete(day, meal.time, meal.name)}/>
                            <div>{meal.name}</div>
                            <EditIcon className="edit-icon" />
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {allMenus[index].allFoodItems
                        .filter((meal) => meal.time === "Dinner")
                        .map((meal, idx) => (
                          <li key={idx} >
                            <DeleteIcon className="delete-icon" onClick={() => handleDelete(day, meal.time, meal.name)}/>
                            <div >{meal.name}</div>
                            <EditIcon className="edit-icon" />
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
