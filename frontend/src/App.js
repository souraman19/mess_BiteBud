import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navigation from './Navigation';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
// import Navbar from './components/Navbar.jsx'
import PatelStudentHomePage from './pages/patelstudent/PatelStudentHomePage';
import Tilakstudent from './pages/Tilakstudent.jsx';
import Patelgallery from "./pages/patelstudent/Patelgallery.jsx";
import Patelcomment from './pages/patelstudent/Patelcomment.jsx';
import Patelfullmenu from './pages/patelstudent/Patelfullmenu.jsx';
import Cheifwarden from './pages/Cheifwarden.jsx';
import Accountant from "./pages/Accountant.jsx";
import Patelallcomplaint from "./pages/patelstudent/Patelallcomplaint.jsx";
import Signup from './pages/Signup.jsx';
import Otpverification from "./pages/OtpVerification.jsx";
import Passwordcreate from './pages/Passwordcreate.jsx';
import EditExpensePage from './pages/accountant/EditExpensePage.jsx';
import MyAllCommentsPage from "./pages/MyAllCommentsPage.jsx";
import MyAllComplaintsPage from "./pages/MyAllComplaintsPage.jsx";
import MyAllImagesPage from "./pages/MyAllImagesPage.jsx";
import ForgotPassword from './components/ForgotPassword.jsx';
import {UserProvider} from "./UserContext.js";

function App() {
    return (
        <Router>
        {/* <Navigation /> */}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otpverification" element={<Otpverification />} />
          <Route path="/passwordcreate" element={<Passwordcreate />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/* <Route path="/login" element={<Login />} /> */}


          <Route path="/patelstudent" element={<PatelStudentHomePage />} />

          <Route path="/patelgallery" element={<Patelgallery />} />
          <Route path="/myallimages" element={<MyAllImagesPage />} />


          <Route path="/patelcomment" element={<Patelcomment />} />
          <Route path="/myallcomments" element={<MyAllCommentsPage />}/>

          <Route path="/patelfullmenu" element={<Patelfullmenu />} />
          <Route path="/patelallcomplaint" element={<Patelallcomplaint />} />
          <Route path="/myallcomplaints" element={<MyAllComplaintsPage />} />


          <Route path="/tilakstudent" element={<Tilakstudent />} />


          <Route path="/cheifwarden" element={<Cheifwarden />} />


          <Route path="/accountant" element={<Accountant />} />
          <Route path="/editexpensepage" element={<EditExpensePage/>}/>
        </Routes>
      </Router>
    );
  }

export default App;
