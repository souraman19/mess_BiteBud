import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navigation from './Navigation';
import Home from './pages/Home.jsx';
import Login from './pages/commonPages/Login.jsx';
// import Navbar from './components/Navbar.jsx'
import StudentHomePage from './pages/studentPages2.0/StudentHomePage.jsx';
import Tilakstudent from './pages/studentPages/Tilakstudent.jsx';
import GalleryPage from "./pages/commonPages/GalleryPage.jsx";
import AllComments from './pages/commentPages/AllComments.jsx';
import FullMessMenuPage from './pages/commonPages/FullMessMenuPage.jsx';
import Cheifwarden from './pages/chiefWardenPages/Cheifwarden.jsx';
import Accountant from "./pages/accountantPages/Accountant.jsx";
import AllComplaints from "./pages/complaintPages/AllComplaint.jsx";
import Signup from './pages/commonPages/Signup.jsx';
import Otpverification from "./pages/commonPages/OtpVerification.jsx";
import Passwordcreate from './pages/commonPages/Passwordcreate.jsx';
import EditExpensePage from './pages/accountantPages/EditExpensePage.jsx';
import MyAllCommentsPage from "./pages/studentPages/MyAllCommentsPage.jsx";
import MyAllComplaintsPage from "./pages/studentPages/MyAllComplaintsPage.jsx";
import MyAllImagesPage from "./pages/studentPages/MyAllImagesPage.jsx";
import ForgotPassword from './components/commonComponents/ForgotPassword.jsx';
// import {UserProvider} from "./UserContext.js";
import MyProfilePage from './pages/commonPages/MyProfilePage.jsx';
import "./styles/globalstyles.css";
import AdminPage from './pages/developersPages/AdminPage.jsx';
import SeeUser from "./pages/developersPages/SeeUsers.jsx";
import DeleteUser from "./pages/developersPages/DeleteUser.jsx";
import AddUser from "./pages/developersPages/AddUser.jsx";
import UpdateUser from "./pages/developersPages/UpdateUser.jsx";
import ProtectedRoute from "./ProtectedRoute.js";
import Test from "./Test.js";
import SignIn from "./pages/loginPages/SignIn.jsx"
import Register from "./pages/loginPages/Register.jsx";
import ExtraDetailsForm from './pages/loginPages/ExtraDetailsForm.jsx';

function App() {
    return (
        <Router>
        {/* <Navigation /> */}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register-form" element={<Register />} />
          <Route path="/extradetails-form" element={<ExtraDetailsForm />} />


          <Route path="/student-home-page"  element={<StudentHomePage />} />


          <Route path="/comment-page" element={<AllComments /> } />
          <Route path="/myallcomments-page" element={<MyAllCommentsPage />}/>


          <Route path="/complaint-page" element={<AllComplaints/>} />


          <Route path="/gallery-page" element={<GalleryPage />} />
          <Route path="/myallimages" element={<MyAllImagesPage />} />


          <Route path="/full-menu-page" element={<FullMessMenuPage />} />

////---------------------------------------------------------------------------------------

          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />}/>} />
          <Route path="/myprofilepage" element={<ProtectedRoute element={<MyProfilePage />}/>} />
          <Route path="/adminpage" element={<ProtectedRoute element={<AdminPage />}/>} />
          <Route path="/see-users" element={<ProtectedRoute element={<SeeUser />}/>} />
          <Route path="/delete-user" element={<ProtectedRoute element={<DeleteUser />}/>} />
          <Route path="/add-user" element={<ProtectedRoute element={<AddUser />} />} />
          <Route path="/update-user" element={<ProtectedRoute element={<UpdateUser />}/>} />
          

          <Route path="/login"  element={<Login />}  />
          <Route path="/signup"  element={<Signup />} />
          <Route path="/otpverification"  element={<Otpverification />} />
          <Route path="/passwordcreate" element={<Passwordcreate />}  />
          <Route path="/forgotpassword" element={<ForgotPassword />}  />
          {/* <Route path="/login" element={<Login />} /> */}






          <Route path="/myallcomplaints" element={<ProtectedRoute element={<MyAllComplaintsPage/>} />} />


          <Route path="/tilakstudent" element={<ProtectedRoute element={<Tilakstudent />}/>} />


          <Route path="/cheifwarden" element={<ProtectedRoute element={<Cheifwarden />}/>} />


          <Route path="/accountant" element={<ProtectedRoute element={<Accountant />}/>} />
          <Route path="/editexpensepage" element={<ProtectedRoute element={<EditExpensePage/>} />}/>
        </Routes>
      </Router>
    );
  }

export default App;
