import React, {  useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import "./../../styles/CommentSegment.css";

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import {useUser} from "./../../UserContext";
import axios from "axios";
import ComplaintSegmentSlide from "./ComplaintSegmentSlide";
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";
import {GET_ALL_COMPLAINTS_ROUTE} from "./../../utils/ApiRoutes.js";


import "swiper/swiper-bundle.css"; // Import the Swiper styles

// Initiate SwiperCore
SwiperCore.use([FreeMode, Pagination]);

export default function CommentSegment() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  // const name = user?.name;
  // const regNo = user?.regNo;
  const hostel = userInfo?.hostel;
  // const username = user?.username;
  // const year = user?.year;
  // const profilePic = user?.profilePic;

  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    try{
      const fetchData = async() => {
        const response = await axios.get(GET_ALL_COMPLAINTS_ROUTE, {params: {hostel}, withCredentials: true});
        // console.log(response.data);
        const myHostelComplaints = response.data.reverse();
        setComplaints(myHostelComplaints);
      };
      fetchData();
    }catch(error){
      console.error("Error in fetching comments", error);
    }
  }, []);

  // console.log("Autoplay Config:", {
  //   delay: 1000,
  //   disableOnInteraction: false,
  // });
  return (
    //outermost box
    <div className="outer-feedback-commentsegment">

      {/* //1st box upper box */}
      <div className="upper-section-commentsegment">
        <h1 className="heading">Complaints</h1>
        <p>Get to know all about new Complaints Registered</p>
        <Link to="/complaint-page">
          <a class="btn btn-outline-secondary" href="#" role="button">
            See all complaints
          </a>
        </Link>
      </div>
      {/* <div>aca</div> */}
      {/* //2nd box lower box */}
      <div className="feedback swiper-container">
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          freeMode={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          className="mySwiper"
        >
          {complaints.map((singleComplaintMap) => 
            <SwiperSlide className="swiper-slide-currentsegment" key = {singleComplaintMap.id}>
              <ComplaintSegmentSlide 
               name = {singleComplaintMap.complaintBy.firstName + ' ' + singleComplaintMap.complaintBy.lastName} 
               username = {singleComplaintMap.complaintBy.username}
               regNo = {singleComplaintMap.regNo}
               complaint={singleComplaintMap.complaintText} 
               upVoteCount = {singleComplaintMap.upVoteCount}
               downVoteCount = {singleComplaintMap.downVoteCount}
               time = {singleComplaintMap.createdAt}
              />
            </SwiperSlide>
          )}
      
        </Swiper>


      </div>
    </div>
  );
}
