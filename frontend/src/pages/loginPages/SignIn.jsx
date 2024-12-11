import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {LOGIN_ROUTE} from "./../../utils/ApiRoutes.js";
import { reducerCases } from "../../context/Constants";
import { useStateProvider } from "../../context/StateContext";


function SignIn() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Client Side: Sign in with:", { email, password });
    try{
        const response = await axios.post(LOGIN_ROUTE, {username: email, password}, {withCredentials: true});
        console.log("gotted response => ", response);
        if(response.status === 201){
          navigate('/register-form');
        } 
        if(response.status === 200){
          dispatch({
            //Dispatch an action to set the newUser state to true.
            type: reducerCases.SET_NEW_USER,
            newUser: true,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO, // Action to set user information in the state.
            userInfo: response.data.user,
          });
          console.log("UserInfo after set globally", userInfo);
          navigate('/student-home-page');
        }
    }catch(err){
        console.error(err);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google");
  };

  const handleFacebookSignIn = () => {
    console.log("Sign in with Facebook");
  };

  const handleTwitterSignIn = () => {
    console.log("Sign in with Twitter");
  };

  return (
    <div style={styles.page}>
        
      <div style={styles.container}>
        <h2 style={styles.header}>Welcome Back</h2>
        <form onSubmit={handleSignIn} style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.signInButton}>Sign In</button>
        </form>

        <p style={styles.orText}>or continue with</p>
        <div style={styles.socialButtonsContainer}>
          <button onClick={handleGoogleSignIn} style={{ ...styles.socialButton, ...styles.google }}>Google</button>
          <button onClick={handleFacebookSignIn} style={{ ...styles.socialButton, ...styles.facebook }}>Facebook</button>
          <button onClick={handleTwitterSignIn} style={{ ...styles.socialButton, ...styles.twitter }}>Twitter</button>
        </div>
        
        <div style={styles.footer}>
          <a href="#" style={styles.footerLink}>Forgot Password?</a>
          <span style={styles.footerText}> | </span>
          <a href="#" style={styles.footerLink}>Register</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    // background: 'grey',
  },
  container: {
    width: '400px',  // Increased width for a larger white portion
    padding: '2.5rem', // Increased padding
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'fadeIn 1s ease',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    color: '#666',
    fontSize: '0.9rem',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  signInButton: {
    padding: '0.8rem',
    backgroundColor: '#6a11cb',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  orText: {
    margin: '1rem 0',
    fontSize: '0.9rem',
    color: '#666',
  },
  socialButtonsContainer: {
    display: 'flex',
    gap: '1rem',
  },
  socialButton: {
    padding: '0.8rem 1.2rem',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  google: {
    backgroundColor: '#db4437',
  },
  facebook: {
    backgroundColor: '#3b5998',
  },
  twitter: {
    backgroundColor: '#1da1f2',
  },
  footer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: '#666',
  },
  footerLink: {
    color: '#2575fc',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  footerText: {
    margin: '0 0.5rem',
  },
};

export default SignIn;
