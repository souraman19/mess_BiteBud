import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navigation from './Navigation';
import Home from './pages/Home.jsx';
import Login from './pages/commonPages/Login.jsx';
// import Navbar from './components/Navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
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
// import MyProfilePage from './pages/commonPages/MyProfilePage.jsx';
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
import Grocery from './pages/accountantPages/Grocery.jsx';
import AddNewExpense from './components/accountantComponents/AddNewExpensePage.jsx';
import AddNewMenuItem from './pages/messPresidentPages/AddNewMenuItemVendorPage.jsx';
import CalorieViewPage from './pages/messPresidentPages/CalorieViewPage.jsx';
import { useStateProvider } from "./context/StateContext.jsx";
import { useEffect, useState } from 'react';
import { reducerCases } from "./context/Constants";
import ProfilePage from './pages/commonPages/ProfilePage.jsx';

function App() {

    const [{ userInfo, newUser }, dispatch] = useStateProvider();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check if user data is present in localStorage
      const savedUser = localStorage.getItem('user');
  
      if (savedUser) {
        const user = JSON.parse(savedUser);
  
        // Dispatch to set the global user state
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: user,
        });
      }
      setLoading(false);
    }, []);  // Add dispatch as dependency

    //!!!!VVI NOTE ########
    //upper runs after the first render, causing an empty state issue. to solve this 
    //   we are adding a loading screen while app waits for restored state
    //dispatch({ type: SET_USER_INFO, userInfo: user }) updates state.
    //React detects state has changed and automatically re-renders the components using useState
    //The page re-renders with the actual global state
    
    if (loading) return <div>Loading...</div>; // Prevent rendering pages until state loads

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
          <Route path="/myallcomplaints-page" element={<MyAllComplaintsPage/>} />


          <Route path="/gallery-page" element={<GalleryPage />} />
          <Route path="/myallimages" element={<MyAllImagesPage />} />


          <Route path="/full-menu-page" element={<FullMessMenuPage />} />
          <Route path="/menu-item" element={<AddNewMenuItem />} />
          <Route path="/calorie-view" element={<CalorieViewPage />} />



          <Route path="/expense-page"  element={<EditExpensePage/>} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/add-new-expense" element={<AddNewExpense />} />



          <Route path="/profile-page" element={<ProfilePage />} />

////---------------------------------------------------------------------------------------

          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />}/>} />
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








          <Route path="/tilakstudent" element={<ProtectedRoute element={<Tilakstudent />}/>} />


          <Route path="/cheifwarden" element={<ProtectedRoute element={<Cheifwarden />}/>} />


          <Route path="/accountant" element={<ProtectedRoute element={<Accountant />}/>} />
        </Routes>
      </Router>
    );
  }

export default App;
