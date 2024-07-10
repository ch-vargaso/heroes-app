import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';

// function NavBar({demoUser, setDemoUser}) {
function NavBar() {
    const { user, logOut } = useContext(AuthContext);
    return (
        <div>
            <div className='navbar-container' >
                <nav className='navbar'>
                    {!user ? (
                        <>
                            <div className='links'>
                                <NavLink to='/' className={({isActive})=> isActive ? "navbar-active" : "navbar-text"}>Home</NavLink>
                            </div>
                            <div className='links'>
                                <NavLink to='login' className={({ isActive }) => isActive ? "navbar-active" : "navbar-text"}>Log in</NavLink>
                                <span> / </span>
                                <NavLink to='signup' className={({ isActive }) => isActive ? "navbar-active" : "navbar-text"}>Sign up</NavLink>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='links'>
                                <NavLink to='feed' className={({ isActive }) => isActive ? "navbar-active" : "navbar-text"}>Home</NavLink>
                                <NavLink to='chat' className={({ isActive }) => isActive ? "navbar-active" : "navbar-text"}>Chat</NavLink>
                            </div>
                            <div className='links'>
                                <NavLink to='profile' className={({ isActive }) => isActive ? "navbar-active" : "navbar-text"}>Profile</NavLink>
                                <NavLink to='login' className={({ isActive }) => isActive ? "navbar-active" : "navbar-text"} onClick={logOut} >Log out </NavLink>
                            </div>
                        </>
                    )}
                </nav>
            </div>  
        </div>
  )
}

export default NavBar