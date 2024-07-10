import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function LogForm(props) {
    const { createNewUser, logIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const goToHomePage = () => {
        navigate('/feed');
      };
    const goToLoginPage = () => {
        navigate('/login');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.functionType === "signUp") {
            createNewUser(email, password, goToLoginPage );
            setEmail('');
            setPassword('');
        }
        if (props.functionType === "login") {
            logIn(email, password, goToHomePage);
            setEmail('');
            setPassword('');
        }
    }
    
  return ( 
    <div>
        <form onSubmit={handleSubmit} className='form-container'> 
            <div className='user-container'> 
                <label htmlFor="username">E-Mail Address</label>
                <input type="text" placeholder="Email" name="psw" value={email} onChange={handleEmailChange} required />                  
                <label htmlFor="password">Password</label>      
                <input type="password" placeholder="Password" name="psw" value={password}
                onChange={(event)=>setPassword(event.target.value)} required />  
                <button   className='button_primary' type="submit">Submit</button>  
                <button   className='button_primary' onClick={goToHomePage}>Back</button>  
            </div>      
        </form>
    </div>
  )
}

export default LogForm