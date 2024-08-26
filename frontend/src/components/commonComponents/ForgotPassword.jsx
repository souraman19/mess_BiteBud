import React from "react";
import img1 from "./../../srcimages/ss1.png";
import img2 from "./../../srcimages/ss2.png";
import img3 from "./../../srcimages/ss3.png";
import img4 from "./../../srcimages/ss4.png";
import img5 from "./../../srcimages/ss5.png";

function ForgotPassword(){
    let correctpasskey = "2002/";
    let passkey = "";
    passkey = prompt("Enter the passkey to get the reference ids and passwords");

    return (
        <div>
            {
                passkey === correctpasskey && (
                    <div>
                        <h1>Get your reference ids and passwords</h1>
            <h1>To get OTP change your app password in backend</h1>
            <h1>Patel</h1>
            <img src={img1} alt="" />
            <h1>Tilak</h1>
            <img src={img2} alt="" />
            <h1>Chief Warden</h1>
            <img src={img3} alt="" />
            <h1>Accountant</h1>
            <img src={img4} alt="" />
            <h1>Admin</h1>
            <img src={img5} alt="" />
                    </div>
                )
    }
        </div>
    );
}
export default ForgotPassword;