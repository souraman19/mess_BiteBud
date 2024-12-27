import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useStateProvider } from "../../context/StateContext";
import { UPDLOAD_IMAGE, GET_ALL_IMAGES } from "../../utils/ApiRoutes.js";

const formatTime = (time) => {
  const parsedTime = new Date(time);
  const timeSinceCreated = new Date() - new Date(time);
  if(timeSinceCreated < 24 * 60 * 60 * 1000){ // less than 24 hours
    return parsedTime.toLocaleTimeString();
  } else {
    return parsedTime.toDateString() + " " + parsedTime.toLocaleTimeString();
  }
};

const Imageinnerbunch = () => {
  const [{ userInfo }] = useStateProvider();
  const myUserId = userInfo.userId;
  const myUsername = userInfo.username;
  const myHostel = userInfo.hostel;
  const myName = userInfo.firstName;

  const [image, setImage] = useState();
  const [allImage, setAllImage] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image for modal
  const [description, setDescription] = useState("");

  useEffect(() => {
    getImage();
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image from your device");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", myUserId);
    formData.append("name", myName);
    formData.append("username", myUsername);
    formData.append("hostel", myHostel);
    formData.append("description", description);

    try {
      await axios.post(UPDLOAD_IMAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setImage(); // Reset the selected image after upload
      getImage(); // Reload images after uploading a new one
      setDescription(""); // Reset the description field after upload
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    try {
      const response = await axios.get(GET_ALL_IMAGES, {params: {hostel: myHostel},
        withCredentials: true,
      });
      const gotAllImages = response.data.data;
      setAllImage(gotAllImages);
    } catch (err) {
      console.error("Error fetching images", err);
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        overflow: "hidden", // Prevents scrollbars
        marginRight: "0",
      }}
    >
      {/* Image Section */}
      <div
        style={{
          width: "75%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "5px",
          marginBottom: "20px",
        }}
      >
        {allImage.length === 0 ? (
          <div>...Loading</div>
        ) : (
          allImage.map((data, index) => (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => openModal(data)}
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
          ))
        )}
      </div>

      {/* Modal Section */}
      <Modal open={modalOpen} onClose={closeModal}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          {selectedImage && (
            <>
              <img
                src={`/uploads/${selectedImage.image}`}
                alt={selectedImage}
                style={{
                  maxWidth: "80%",
                  maxHeight: "70%",
                  objectFit: "contain",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                  marginBottom: "20px",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "linear-gradient(90deg, #ff8a00, #e52e71)",
                  boxShadow: "0 4px 15px rgba(255, 138, 0, 0.5)",
                  marginBottom: "10px",
                }}
              >
                {selectedImage.description && (
                  <h2 style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
                    {selectedImage.description}
                  </h2>
                )}
              </div>
              <div
                style={{
                  color: "#ddd",
                  fontSize: "18px",
                  fontStyle: "italic",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                uploaded by: {selectedImage.uploadedBy.username}
              </div>
              <div
                style={{
                  color: "#ddd",
                  fontSize: "15px",
                  fontStyle: "italic",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                ~ {formatTime(selectedImage.createdAt)}
              </div>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  backgroundColor: "#ff1744",
                  color: "#fff",
                }}
                onClick={closeModal}
              >
                <CloseIcon />
              </Button>
            </>
          )}
        </div>
      </Modal>

      {/* Form Section */}
      <div
        style={{
          width: "25%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky",
          top: "20px", // Adjust this value based on your needs
          zIndex: "100", // Ensures the form stays on top of other elements
          height: "calc(100vh - 480px)",
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
            width: "100%",
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
          <input
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              marginBottom: "10px",
            }}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
          />
          <button
            type="submit"
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
