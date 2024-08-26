import React, { createContext, useContext, useState } from "react";
import img1 from "./srcimages/image1.png";
import img2 from "./srcimages/image2.png";

// Provide a default value for the context
// const defaultUserContext = {
//   user: {
//     name: "Default Name",
//     username: "DefaultUsername",
//     regNo: "00000000",
//     year: "N/A",
//     email: "default@example.com",
//     profilePic: img1, // or a default image
//     hostel: "N/A",
//     identity: "N/A",
//   },
//   updateUser: () => {}, // Placeholder function
// };

const UserContext = createContext();

export const UserProvider = ({ children }) => {



  const initialState = {
    isSignedIn: false,
    name: "Shivanshi Sehgal",
    username: "shivanshi",
    regNo: "20223268",
    year: null,
    email: "soura9775@gmail.com",
    profilePic:img1,
    hostel:"hostel",
    identity:"patelstudent",
    profilePicture: img1
  };

  const [user, setUser] = useState(initialState);

  const updateUser = (newUser) => {
    console.log("Updating user with: >>>>>>>>>>>>>>>>> ------------", newUser);
    setUser(newUser)
  };
  console.log("UserContext value:", { user, updateUser });

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
  
};

export const useUser = () => {
  return useContext(UserContext);
};
