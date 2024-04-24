import React from "react";
import Randomdaymessmenu from "../../components/RandomDayMessMenu";
import Navbar from "../../components/Navbar";
import "./../../styles/PatelFullMenu.css";
import axios from "axios";
import { useState, useEffect } from "react";
import img1 from "./../../srcimages/food3.jpg";
import {useUser} from "./../../UserContext";

function Patelfullmenu() {
    const {user, updateUser} = useUser();
    const hostel = user.hostel;

    const [allMenus, setAllMenus] = useState([]);
    const [mealDay, setMealDay] = useState("");
    const [mealTime, setMealTime] = useState("");
    const [mealName, setMealName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            const messmenu = await axios.get("http://localhost:5000/api/getmessmenu");
            console.log(messmenu);
            setAllMenus(messmenu.data);
            console.log("mess menu fetch success");
        }
        fetchData();
    }, []);


    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("day", mealDay);
        formData.append("mealTime", mealTime);
        formData.append("name", mealName);

        try{
            const response = await axios.post("http://localhost:5000/api/addnewmeal", formData);
            console.log(response.data);
            setMealDay("");
            setMealName("");
            setMealTime("");
            setSelectedImage(null);


            document.getElementById("daySelection").selectIndex = 0;
            document.getElementById("timeSelection").selectIndex = 0;
            console.log("my foot");
            


            //adding a little delay becuse it takes lttle time to be uploaded the image in folder
            setTimeout(async () => {
              try {
                const updatedMenu = await axios.get("http://localhost:5000/api/getmessmenu");
                setAllMenus(updatedMenu.data);
              } catch (error) {
                console.log("Error in fetching new meals");
              }
            }, 2000); // 2000 milliseconds = 2 seconds
           
        } catch(error){
            console.log("error in adding meal");
        }
    }

    const handleFileChange = (e) => {
        setSelectedImage(e.target.files[0]);
    }

    function updateWholeMenu(fullMenu){
      setAllMenus(fullMenu);
    }



  return (
    <div className="Patel_full_menu_outermost_div">
      <Navbar />
      <div>
        {allMenus.map((singleMenu) => (
            <Randomdaymessmenu 
            day={singleMenu.day} 
            myArray = {singleMenu.allFoodItems}
            updateWholeMenu = {updateWholeMenu}
            />
        ))}
      </div>
      {(hostel === 'hostel') && (
        <div className="add_menu_div">
        <h2>Add new meal</h2>
        <form
          onSubmit={handleSubmit}
        >

          <div className="daySelection_div">
            <label htmlFor="daySelection">Choose day</label>
            <select name="daySelection" id="daySelection" value={mealDay} onChange={(e) => setMealDay(e.target.value)}>
              <option value="">Choose day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thrusday">Thrusday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div className="timeSelection_div">
            <label htmlFor="timeSelection">Choose meal</label>
            <select name="timeSelection" id="timeSelection" value={mealTime} onChange={(e) => setMealTime(e.target.value)}>
              <option value="">Choose meal time</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Snacks">Snacks</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
          <div>
            <label htmlFor="mealNameText">Enter name of the food</label>
            <input type="text" value={mealName} onChange={(e) => setMealName(e.target.value)}/>
          </div>

          <label>
            Choose Image
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      )}
    </div>
  );
}
export default Patelfullmenu;
