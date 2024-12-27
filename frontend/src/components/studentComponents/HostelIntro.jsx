import React from "react";
import { useStateProvider } from "../../context/StateContext";

function Hostelintro(){

    const [{ userInfo, newUser }, dispatch] = useStateProvider();
    const hostel = userInfo?.hostel;
    return (
        <div>
            <h1 
            style={{
             marginTop: "50px",

             padding: "1.5rem 0",
             fontSize: "3rem",
             textAlign: "center",
             display: "block",
             fontFamily: "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
           
             backgroundColor: "#fbe6f5",
             border: "3px solid #e0a7a7",
             borderRadius: "20px"


        }}
            >
                Welcome to {hostel} mess portal
            </h1>
        </div>
    );
}

export default Hostelintro;