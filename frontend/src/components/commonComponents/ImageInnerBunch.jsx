  // Import useState, useEffect, and Modal components from Material-UI
  import React, { useEffect } from "react";
  import axios from "axios";
  // import ImageList from "@mui/material/ImageList";
  // import ImageListItem from "@mui/material/ImageListItem";
  import Button from "@mui/material/Button";
  // import CloudUploadIcon from "@mui/icons-material/CloudUpload";
  import { styled } from "@mui/material/styles";
  import Modal from "@mui/material/Modal";
  import CloseIcon from "@mui/icons-material/Close";
  import { useState } from "react";
  import { reducerCases } from "../../context/Constants";
  import { useStateProvider } from "../../context/StateContext";
  import { v4 as uuidv4 } from "uuid";
  import { GET_ALL_IMAGES, UPDLOAD_IMAGE } from "./../../utils/ApiRoutes.js";

  // const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  //   height: 1,
  //   overflow: "hidden",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: "nowrap",
  //   width: 1,
  // });

  const Imageinnerbunch = () => {
    const [{ userInfo, newUser }, dispatch] = useStateProvider();
    const myUserId = userInfo.userId;
    const myUsername = userInfo.username;
    const myHostel = userInfo.hostel;
    const myName = userInfo.firstName;
    const myYear = userInfo.year;
    const myRegNo = userInfo.regNo;
    const profilePicture = userInfo.profilePicture;

    const [image, setImage] = useState();
    const [allImage, setAllImage] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close
    const [selectedImage, setSelectedImage] = useState(null); // State to track selected image for modal

    useEffect(() => {
      getImage();
    }, []);

    const submitImage = async (e) => {
      console.log("submitImage function called");
      e.preventDefault();
      if (!image) {
        alert("Please select any image from your device");
        return;
      }
      const formData = new FormData();
      formData.append("image", image);
      formData.append("userId", myUserId);
      formData.append("name", myName);
      formData.append("username", myUsername);
      formData.append("hostel", myHostel);
      formData.append("description", "hello, this is an image description");

      try{
        const result = await axios.post(UPDLOAD_IMAGE, formData, {
          headers: { "Content-Type": "multipart/form-data" }, withCredentials: true,
        });
        setImage();
      }catch(err){
        console.error("Error uploading image:", err);
      }
    };

    const onInputChange = (e) => {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    };

    const getImage = async () => {
      try {
        const response = await axios.get(GET_ALL_IMAGES, {
          withCredentials: true,
        });
        const gotAllImages = response.data.data;
        // console.log("response=>>>", response);
        setAllImage(gotAllImages);
        // console.log("got=>>>", allImage);
      } catch (err) {
        console.error("Error in fetching images", err);
      }
    };

    const openModal = (selectedImg) => {
      setSelectedImage(selectedImg);
      setModalOpen(true);
    };

    const closeModal = () => {
      setSelectedImage(null);
      setModalOpen(false);
    };

    return (
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          {allImage.length === 0 ? 
          (<div>...Loading</div>): 
            (allImage.map((data, index) => (
              <div
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => openModal(data.image)}
              >
                <img
                  src={`/uploads/${data.image}`}
                  alt={data.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )))}
        </div>

        <Modal open={modalOpen} onClose={closeModal}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            {selectedImage && (
              <>
                <img
                  src={`/uploads/${selectedImage}`}
                  alt={selectedImage}
                  style={{
                    maxWidth: "90%",
                    maxHeight: "90%",
                    objectFit: "contain",
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ position: "absolute", top: 10, right: 10 }}
                  onClick={closeModal}
                >
                  <CloseIcon />
                </Button>
              </>
            )}
          </div>
        </Modal>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "",
          }}
        >
          <form
            onSubmit={submitImage}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <label
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "#f0f0f0",
              }}
            >
              Choose Image
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={onInputChange}
                style={{ display: "none" }}
              />
            </label>
            <button
               type="button"
               onClick={submitImage}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default Imageinnerbunch;
