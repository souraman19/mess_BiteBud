import React, { useRef, useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import "./../../styles/CommentSegment.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import {useUser} from "./../../UserContext";
import axios from "axios";
import ComplaintSegmentSlide from "./ComplaintSegmentSlide";

import "swiper/swiper-bundle.css"; // Import the Swiper styles

// Initiate SwiperCore
SwiperCore.use([FreeMode, Pagination]);

export default function CommentSegment() {
  const {user} = useUser();
  console.log("User in 1: ", user);
  const name = user?.name;
  const regNo = user?.regNo;
  const hostel = user?.hostel;
  const username = user?.username;
  const year = user?.year;
  const profilePic = user?.profilePic;

  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    try{
      const fetchData = async() => {
        const response = await axios.get("http://localhost:5000/api/patelcomplaints");
        // console.log(response.data);
        const myHostelComplaints = response.data;
        if(hostel !== "hostel"){
          const myHostelComplaints = response.data.filter((x) => x.hostel === hostel);
          setComplaints(myHostelComplaints);
        } else {
          setComplaints(myHostelComplaints);
        }
      };
      fetchData();
    }catch(error){
      console.error("Error in fetching comments", error);
    }
  }, []);

  console.log("Autoplay Config:", {
    delay: 1000,
    disableOnInteraction: false,
  });
  return (
    //outermost box
    <div className="outer-feedback-commentsegment">

      {/* //1st box upper box */}
      <div className="upper-section-commentsegment">
        <h1 className="heading">Complaints</h1>
        <p>Get to know all about new Complaints Registered</p>
        <Link to="/patelallcomplaint">
          <a class="btn btn-outline-secondary" href="#" role="button">
            See all complaints
          </a>
        </Link>
      </div>

      {/* //2nd box lower box */}
      <div className="feedback swiper-container">
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {complaints.map((singleComplaintMap) => 
            <SwiperSlide className="swiper-slide-currentsegment" key = {singleComplaintMap.id}>
              <ComplaintSegmentSlide 
               name = {singleComplaintMap.name} 
               username = {singleComplaintMap.username}
               regNo = {singleComplaintMap.regNo}
               year = {singleComplaintMap.year}
               complaint={singleComplaintMap.complaint} 
               upVoteCount = {singleComplaintMap.upVoteCount}
               downVoteCount = {singleComplaintMap.downVoteCount}
              />
            </SwiperSlide>
          )}
      
        </Swiper>


      </div>
    </div>
  );
}
