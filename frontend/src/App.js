import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navigation from './Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
// import Navbar from './components/Navbar.jsx'
import Patelstudent from './pages/patelstudent/PatelStudentHomePage';
import Tilakstudent from './pages/Tilakstudent';
import Patelgallery from "./pages/patelstudent/PatelGallery";
import Patelcomment from './pages/patelstudent/PatelComment';
import Patelfullmenu from './pages/patelstudent/PatelFullMenu';
import Cheifwarden from './pages/Cheifwarden';
import Accountant from "./pages/Accountant";
import Patelallcomplaint from "./pages/patelstudent/PatelAllComplaint";
import Signup from './pages/SignUp';
import Otpverification from "./pages/Otpverification";
import Passwordcreate from './pages/Passwordcreate';
import EditExpensePage from './pages/accountant/EditExpensePage';
import MyAllCommentsPage from "./pages/MyAllCommentsPage";
import MyAllComplaintsPage from "./pages/MyAllComplaintsPage";
import MyAllImagesPage from "./pages/MyAllImagesPage.jsx";

function App() {
    return (
      <Router>
        {/* <Navigation /> */}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otpverification" element={<Otpverification />} />
          <Route path="/passwordcreate" element={<Passwordcreate />} />
          {/* <Route path="/login" element={<Login />} /> */}


          <Route path="/patelstudent" element={<Patelstudent />} />

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
