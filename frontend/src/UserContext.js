import React, { createContext, useContext, useState } from "react";
import img1 from "./srcimages/image1.png";
import img2 from "./srcimages/image2.png";

// Provide a default value for the context
const defaultUserContext = {
  user: {
    name: "Default Name",
    username: "DefaultUsername",
    regNo: "00000000",
    year: "N/A",
    email: "default@example.com",
    profilePic: img1, // or a default image
    hostel: "N/A",
    identity: "N/A",
  },
  updateUser: () => {}, // Placeholder function
};

const UserContext = createContext(defaultUserContext);

export const UserProvider = ({ children }) => {



  const initialState = {
    name: "Sourajit Mandal",
    username: "Sourajit",
    regNo: "20223268",
    year:"3rd",
    email: "sourajit119@gmail.com",
    profilePic:img1,
    hostel:"Patel",
    identity:"patelstudent",
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
