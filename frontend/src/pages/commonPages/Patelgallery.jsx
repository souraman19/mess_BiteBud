import React from "react";
import Navbar from "../../components/commonComponents/Navbar";
import Imagebunch from "../../components/commonComponents/ImageBunch";
import { Link } from "react-router-dom";
import "./../../styles/PatelGallery.css";

function Patelgallery() {
  return (
    <div className="Patelgallery-outermost-div">
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px", // Adds spacing between the links
          padding: "20px 0",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for overall depth
          borderRadius: "8px",
          marginBottom: "7px",
        }}
      >
        <Link
          to="/myallimages"
          style={{
            textDecoration: "none",
            color: "rgb(173, 250, 227)",
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            className="my-imges-link"
            style={{
              fontFamily: "'Roboto', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            My Images
          </h1>
        </Link>
        <Link
          to="/gallery-page"
          style={{
            textDecoration: "none",
            color: "rgb(157, 205, 214)",
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            className="my-imges-link"
            style={{
              fontFamily: "'Roboto', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            All Images
          </h1>
        </Link>
      </div>

      <Imagebunch />
    </div>
  );
}
export default Patelgallery;
