import React, { createContext, useContext, useState } from "react";
import img1 from "./srcimages/image1.png";
import img2 from "./srcimages/image2.png";
const UserContext = createContext();

export const UserProvider = ({ children }) => {



  const initialState = {
    name: "",
    username: "",
    regNo: "",
    hostel:"",
    identity:"",
    year:"",
    email: "",
    profilePic:null,
  };

  const [user, setUser] = useState(initialState);

  const updateUser = (newUser) => {
    console.log("Updating user with: >>>>>>>>>>>>>>>>> ------------", newUser);
    setUser((prevUser) => ({ ...prevUser, ...newUser }));
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
