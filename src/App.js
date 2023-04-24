import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NavBar from './components/NavBar';
import './App.css';
import Character from './pages/Character';
import Favourites from './pages/Favourites';
import Error404 from './pages/Error404';
import Login from './pages/Login';
import Dev from './pages/Dev';
import Content from './pages/Content';
import { AuthContextProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Chat from './pages/Chat';
import {FavouritesContextProvider } from './contexts/FavoritesContext';

function App() {
  const [demoUser, setDemoUser] = useState({email: "demo@email.com", username: "Demoman" })
  return (
    <> 
      <AuthContextProvider>
        <FavouritesContextProvider>
        <NavBar demoUser={demoUser} setDemoUser={setDemoUser} />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* voy a abrir una subdivisión */}
          <Route path='/about' element={<About />}>
            <Route path='dev' element={<Dev/>}/>
            <Route path='content' element={<Content/>}/>
          </Route>
          <Route path='favourites' element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
          {/* Esta es la ruta que necesito para cambiar los links a personalizados.... o no???? */}
          <Route path='/character/:id/:name' element={<ProtectedRoute><Character /></ProtectedRoute>} />
          <Route path='*' element={<Error404 />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<ProtectedRoute><Chat/></ProtectedRoute>}/>

          </Routes>
          </FavouritesContextProvider>
        

      </AuthContextProvider>
    </>
  );
}

export default App;
