// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateProvider } from "./context/StateContext.jsx";

function ProtectedRoute({ element }) {
  const [{ userInfo }] = useStateProvider();

  if (!userInfo) {
    // alert(userInfo);
    return <Navigate to="/" />;
  }

  return element;
}

export default ProtectedRoute;
