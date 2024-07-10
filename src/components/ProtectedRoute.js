import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'

function ProtectedRoute(props) {
  const { user, userChecked } = useContext(AuthContext);
  if (!userChecked) {
    return <p>Loading...</p>
    // TODO: I need a spinner....
  }
  if (user) {
    return <>{props.children}</>;
  }
  return <Navigate to="/" replace state={{ from: window.location.pathname }} />;
}

export default ProtectedRoute