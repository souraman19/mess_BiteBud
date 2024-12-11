import React from "react";
import { useUser } from "../../UserContext";
import "./../../styles/MyAllImagesPage.css";
import Navbar from "../../components/commonComponents/Navbar";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useStateProvider } from "../../context/StateContext";
import { GET_ALL_IMAGES, UPDLOAD_IMAGE, DELETE_IMAGE } from "./../../utils/ApiRoutes.js";

function MyAllImagesPage() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const myUserId = userInfo.userId;
  const myUsername = userInfo.username;
  const myHostel = userInfo.hostel;
  const myName = userInfo.firstName;
  const myYear = userInfo.year;
  const myRegNo = userInfo.regNo;
  const profilePicture = userInfo.profilePicture;

    const [allImages, setAllImages] = useState([]);
    
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get(GET_ALL_IMAGES, {
                  withCredentials: true,
                });
                const gotAllImages = response.data.data;
                setAllImages(gotAllImages.filter((image) => image.uploadedBy.userId === myUserId));
            }catch(error){
                console.log("Error in getting my images");
            }
        };
        fetchData();
    }, []);
    
   
    const handleDelete = async(itemId) => {
        try{
            await axios.delete(`${DELETE_IMAGE}/${itemId}`, {withCredentials: true});
            console.log("deletion successful");
            setAllImages(allImages.filter((image) => image.itemId !== itemId));
        }catch(error){
            console.log("Error in deletining my images");
        }
    }
 
  return (
    <div className="MyAllImagesPage_outermost_box">
        <Navbar />
        <h1>My All Images</h1>
        <div className="my-all-images-container">
      {allImages.map((image) => (
        // console.log(`../uploads/${image.img}`),
        <div className="my-image-button-div">
            <img
          key={image.itemId}
          src={`./uploads/${image.image}`}
          alt={image.src}
            />

            <button onClick={() => {handleDelete(image.itemId)}}>
                <DeleteIcon style={{fontSize:"2.5rem"}}/>
            </button>

        </div>
      ))}
    </div>
    </div>
  );
}

export default MyAllImagesPage;
