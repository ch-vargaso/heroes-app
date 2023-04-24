import React, { useContext } from 'react'
import {NavLink, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';


function NavBar({demoUser, setDemoUser}) {
    const location = useLocation();
    const { user, logOut } = useContext(AuthContext);
    return (
        <div>
            <div className='navBar-container' >
                <nav className='navBar'>
                    <NavLink to='/' className={({isActive})=> isActive ? "navbar-link" : null}>Home</NavLink>
                    {/* <NavLink to='Character' className={({ isActive }) => isActive ? "navbar-link" : null}>Character</NavLink> */}
                    {user && <NavLink to='favourites' className={({ isActive }) => isActive ? "navbar-link" : null}>Favourites</NavLink>}
                    {user && <NavLink to='chat' className={({ isActive }) => isActive ? "navbar-link" : null}>Chat</NavLink>}
                
                    {/* <NavLink to='login' className={({ isActive }) => isActive ? "navbar-link" : null}>Login</NavLink> */}
                    <NavLink to='about' className={({ isActive }) => isActive ? "navbar-link" : null}>About</NavLink>
                    {/* end se utiliza después del Navlink para "detener" cuando se muestra un sublink... Esta puede ser una opción */}
                    {/* con este condicional se muestra o no el path de los sub-links */}
                    {location.pathname.includes("about") ?
                        <>
                            <NavLink to='about/dev' className={({ isActive }) => isActive ? "navbar-link" : null}>Dev</NavLink>
                            <NavLink to='about/content' className={({ isActive }) => isActive ? "navbar-link" : null}>Content</NavLink>
                        </>
                    : null}
                </nav> 
                { !user ? <NavLink to='login' className={({ isActive }) => isActive ? "navbar-link" : null}>Log in</NavLink> : <p style={{cursor: "pointer"}} onClick={logOut} >log out</p> }
               
                


            </div>  
        </div>
  )
}

export default NavBar