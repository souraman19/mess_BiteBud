import React from "react";
import { useUser } from "../../UserContext";
import "./../styles/MyAllImagesPage.css";
import Navbar from "../../components/commonComponents/Navbar";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function MyAllImagesPage() {
  const { user } = useUser();
  const myRegNo = user.regNo;

    const [allImages, setAllImages] = useState([]);
    
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get("http://localhost:5000/api/getmyimages");
                const gotAllImages = response.data;
                setAllImages(gotAllImages.filter((image) => image.regNo === myRegNo));
            }catch(error){
                console.log("Error in getting my images");
            }
        };
        fetchData();
    }, []);
    
   
    const handleDelete = async(_id) => {
        try{
            const response = await axios.delete(`http://localhost:5000/api/deletemyimage/${_id}`);
            console.log("deletion successful");
            setAllImages(allImages.filter((image) => image._id !== _id));
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
          key={image.id}
          src={require(`../../uploads/${image.img}`)}
          alt={image.src}
            />

            <button onClick={() => {handleDelete(image._id)}}>
                <DeleteIcon style={{fontSize:"2.5rem"}}/>
            </button>

        </div>
      ))}
    </div>
    </div>
  );
}

export default MyAllImagesPage;
