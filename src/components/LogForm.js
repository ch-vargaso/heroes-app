import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function LogForm(props) {
    const { createNewUser, logIn } = useContext(AuthContext);
    // console.log(props)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.functionType === "register") {
            createNewUser(email, password);
            setEmail('');
            setPassword('');
        }
        if (props.functionType === "login") {
            logIn(email, password);
            setEmail('');
            setPassword('');
        }
        
    }
    
  return ( 
      <div>
          <form onSubmit={handleSubmit} className='login-container'> 
              <div className='user-container'> 
                  <label htmlFor="username"><b>E-Mail Address</b></label>
                  <input type="text" placeholder="Email" name="psw" value={email} onChange={handleEmailChange} required />                  
                  <label htmlFor="password"><b>Password</b></label>      
                  <input type="password" placeholder="Password" name="psw" value={password}
                  onChange={(event)=>setPassword(event.target.value)} required />  
                  <button type="submit">Submit</button>     
                  {/* Aqußi tengo que decidir cual de las dos formas me convence más...Email con variable arriba o assword con variable dentro del Onchange */}
           {/* Aqui se puede meter otros datos como cancelar, remember me y eso... */}  
        </div>      
      </form>
    </div>
  )
}

export default LogForm