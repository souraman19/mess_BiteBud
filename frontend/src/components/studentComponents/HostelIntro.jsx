import React from "react";
import { useStateProvider } from "../../context/StateContext";

function Hostelintro() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const hostel = userInfo?.hostel;
 const firstName = userInfo?.firstName;
 
  return (
    <div
      style={{
        marginTop: "2rem",
        width: "100%",
        padding: "2rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <h1
        style={{
          padding: "1.5rem 3rem",
          fontSize: "3rem",
          textAlign: "center",
          fontFamily:
            "'Poppins', Canva Sans, Noto Sans Variable, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          color: "#ffffff",
          background: "linear-gradient(90deg,rgb(154, 157, 255),rgb(207, 222, 254),rgb(161, 140, 209))",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
          border: "4px solid #ffffff",
          borderRadius: "25px",
          display: "inline-block",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
        }}
      >
        Welcome to {hostel}  Mess Portal
      </h1>
    </div>
  );
}

export default Hostelintro;