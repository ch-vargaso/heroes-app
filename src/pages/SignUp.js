import React from 'react'
import LogForm from '../components/LogForm'

function SignUp() {
  return (
    <div className='home-container'>
      <h1 className='form-title'>Create your account</h1>
      <LogForm functionType={"signUp" } />
    </div>
  )
}

export default SignUp