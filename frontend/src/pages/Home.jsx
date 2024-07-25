// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div >
      <h2>Home Page</h2>
      <h3>Welcome to Webster Event! <br/></h3>
      <h2>
      <Link to="/patelstudent">GoTo Patel student Portal( for TESTING !!! ) </Link>
      </h2>
      <h2>
      <Link to="/tilakstudent">GoTo Tilak student Portal( for TESTING !!! )</Link>
      </h2>

      <h2>
      <Link to="/cheifwarden">GoTo Cheifwarden Portal( for TESTING !!! ) </Link>
      </h2>

      <h2>
      <Link to="/accountant">GoTo Accountant Portal( for TESTING !!! ) </Link>
      </h2>

      <h1>
      <Link to="/login">Login</Link>
      </h1>

      <h1>
      <Link to="/signup">Signup</Link>
      </h1>

      <h1>
      <Link to="/otpverification">Otp</Link>
      </h1>

      <h1>
      <Link to="/passwordcreate">Password create</Link>
      </h1>
    </div>
  );
}

export default Home;
