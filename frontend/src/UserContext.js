import { createContext, useContext, useState } from "react";
import img1 from "./srcimages/food3.jpg";
const UserContext = createContext();

export const UserProvider = ({ children }) => {

  // const initialState = {
  //   username: "soura",
  //   fullname: "Sourajit Mandal",
  //   email: "Cyber26@gmail.com",
  //   registrationNo: "20214567",
  //   profilePicture: img1,
  //   year: "2nd",
  //   hostel: "Patel",
  //   roomNo: "329",
  //   MyComments: [
  //     {
  //       comment: "todays meal was worst",
  //       date: "",
  //       time: "",
  //       recomments: [
  //         { username:"manu",recomment: "cant be more agreed", date: "", time: "" },
  //         { username:"vishal",recomment: "why are even eating here", date: "", time: "" },
  //         {
  //           username:"likhesh",
  //           recomment: "we must regiser a complaint for this",
  //           date: "",
  //           time: "",
  //         },
  //       ],
  //     },
  //     {
  //       comment: "tommorrow there should be our special dinner",
  //       date: "",
  //       time: "",
  //       recomments: [
  //         {
  //           username:"mithu",
  //           recomment: "no that would be day after tomorrow",
  //           date: "",
  //           time: "",
  //         },
  //         {
  //           username:"emon",
  //           recomment: "no tomorrow will be our special",
  //           date: "",
  //           time: "",
  //         },
  //       ],
  //     },
  //   ],
  //   MyComplaints: [
  //     {
  //       complaint: "There was a more water in todays daal",
  //       date: "",
  //       time: "",
  //       upvoteCount: "15",
  //       downvoteCount: "3",
  //       resolvedStatus: "Unresolved",
  //     },
  //     {
  //       complaint: "The mess management committe should be changed",
  //       date: "",
  //       time: "",
  //       upvoteCount: "12",
  //       downvoteCount: "7",
  //       resolvedStatus: "resolved",
  //     },
  //   ],
  //   UploadedPics: [img1, img1, img1],
  //   allComments: [
  //     {
  //       username:"manu",
  //       comment: "todays meal was worst",
  //       date: "",
  //       time: "",
  //       recomments: [
  //         { username:"suraj", recomment: "cant be more agreed", date: "", time: "" },
  //         { username:"vishal", recomment: "why are even eating here", date: "", time: "" },
  //         {
  //           username:"likesh",
  //           recomment: "we must regiser a complaint for this",
  //           date: "",
  //           time: "",
  //         },
  //       ],
  //     },
  //     {
  //       username:"manu",
  //       comment: "todays meal was worst",
  //       date: "",
  //       time: "",
  //       recomments: [
  //         { username:"suraj", recomment: "cant be more agreed", date: "", time: "" },
  //         { username:"vishal", recomment: "why are even eating here", date: "", time: "" },
  //         {
  //           username:"likesh",
  //           recomment: "we must regiser a complaint for this",
  //           date: "",
  //           time: "",
  //         },
  //       ],
  //     },
  //     {
  //       username:"manu",
  //       comment: "todays meal was worst",
  //       date: "",
  //       time: "",
  //       recomments: [
  //         { username:"suraj", recomment: "cant be more agreed", date: "", time: "" },
  //         { username:"vishal", recomment: "why are even eating here", date: "", time: "" },
  //         {
  //           username:"likesh",
  //           recomment: "we must regiser a complaint for this",
  //           date: "",
  //           time: "",
  //         },
  //       ],
  //     },
  //   ],
  //   allComplaints: [
  //     {
  //       complaint: "There was a more water in todays daal",
  //       date: "",
  //       time: "",
  //       upvoteCount: "15",
  //       downvoteCount: "3",
  //       resolvedStatus: "Unresolved",
  //     },
  //     {
  //       complaint: "There was a more water in todays daal",
  //       date: "",
  //       time: "",
  //       upvoteCount: "15",
  //       downvoteCount: "3",
  //       resolvedStatus: "Unresolved",
  //     },
  //     {
  //       complaint: "There was a more water in todays daal",
  //       date: "",
  //       time: "",
  //       upvoteCount: "15",
  //       downvoteCount: "3",
  //       resolvedStatus: "Unresolved",
  //     },
  //   ],
  //   allPics: [img1, img1, img1, img1],
  //   myUpVotedComplaints:[],
  //   myDownVotedComplaints:[],
  //   myReCommentedComments:
  // };

  const initialState = {
    name: "Sourajit Mandal",
    username: "soura",
    regNo: "20223268",
    year:"2nd",
    email: "souraj67&gmail.com",
  };

  const [user, setUser] = useState(initialState);

  const updateUser = (newUser) => {
    setUser((prevUser) => ({ ...prevUser, ...newUser }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
