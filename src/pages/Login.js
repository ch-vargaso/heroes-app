import React from 'react'
import LogForm from '../components/LogForm'

function Login() {
  return (
    <div className='home-container'>
      <h1 className='form-title'>Enter the Realm</h1>
      <LogForm functionType={"login" } />
    </div>
  )
}

export default Login
