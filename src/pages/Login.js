import React from 'react'
import LogForm from '../components/LogForm'

function Login() {
  return (
    <div>
      <h3>Log In</h3>
      <LogForm functionType={"login" } />
      <h3>Don't you have a Account?</h3>
      <h2>Create an Account</h2>
      <LogForm functionType={"register" } />
      <h3>How can I cahange the button??????</h3> 
    </div>
  )
}

export default Login

// hacer el Log in en el Nav Bar para que las personas puedan iniciar sesión desde arriba 
// también en la parte de abajo para que las personas puedan iniciar seisón desde la página de Log in 