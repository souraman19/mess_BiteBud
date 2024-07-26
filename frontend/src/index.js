import React from 'react';
import ReactDOM  from 'react-dom';
import App from './App';
import {UserProvider} from "./UserContext";
import PatelStudentHomePage from "./pages/patelstudent/PatelStudentHomePage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* wrapping up to access the valus from userContext  */}
    <UserProvider>  
      <App />
    </UserProvider>
    
  </React.StrictMode>
);

