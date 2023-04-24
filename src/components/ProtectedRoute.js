import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'

function ProtectedRoute(props) {
  const { user, userChecked } = useContext(AuthContext);
  const navigate = useNavigate()
  return (
    <>
      {/* aquí es con mensaje */}
      {/* {user ? props.children : <p>This page is restricted</p>} */}
      {/* Aquí es regresando al home... */}
      {userChecked ? user ? props.children : < Navigate to={'/'}/>: <p>Loading...</p>}
    </>
  )
}

export default ProtectedRoute