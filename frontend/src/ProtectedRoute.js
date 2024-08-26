// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Adjust the path as needed

function ProtectedRoute({ element }) {
  const { user } = useUser();

  if (!user.isSignedIn) {
    return <Navigate to="/" />;
  }

  return element;
}

export default ProtectedRoute;
