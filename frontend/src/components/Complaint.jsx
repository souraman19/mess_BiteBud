import React, { useRef, useState ,  useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import {useUser} from "./../UserContext";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { EffectCards } from 'swiper/modules';

import "./../styles/complaint.css";
import Randomcomplaint from "./RandomComplaint.jsx";


import { Pagination } from "swiper/modules";

export default function Complaint() {
  const {user} = useUser();
  console.log("User in 5: ", user);
  const name = user?.name;
  const username = user?.username;
  const hostel = user?.hostel;
  const regNo = user?.regNo;
  const year = user?.year;
  const profilePic = user?.profilePic;
  const [allComplaints, setAllComplaints] = useState([]);

  useEffect(() => {
    try{
      const fetchData = async() => {
        const response = await axios.get("http://localhost:5000/api/patelcomplaints");
        // console.log(response.data);
        const myHostelComplaints = response.data;
        if(hostel !== "hostel"){
          const myHostelComplaints = response.data.filter((x) => x.hostel === hostel);
          setAllComplaints(myHostelComplaints);
        } else {
          setAllComplaints(myHostelComplaints);
        }
      };
      fetchData();
    }catch(error){
      console.error("Error in fetching comments", error);
    }
  }, []);



  return (
    <div className="outermost-box-complaint">
      <div>
        <div className="upper-section1">
          <h1 className="heading1">Complaints</h1>
        </div>
      </div>
      <div className="swiper">
        <>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="swiper-complaint"
          >
            {allComplaints.map((singleComplaint)=> (
               <SwiperSlide className="swiper-slide-complaint">
               <Randomcomplaint 
               name = {singleComplaint.name}
               year = {singleComplaint.year}
               complaint = {singleComplaint.complaint}
               />
             </SwiperSlide>
            ))}
           
            

          </Swiper>
        </>
      </div>

      <div className="upper-section1">
      <Link to="/patelallcomplaint">
        <a class="btn btn-secondary" href="#" role="button">
          See all complaints & Register your Complaint
        </a>
      </Link>
      </div>
    </div>
  );
}
