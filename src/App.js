import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NavBar from './components/NavBar';
import './App.css';
import Character from './pages/Character';
import Error404 from './pages/Error404';
import Login from './pages/Login';
import Dev from './pages/Dev';
import Content from './pages/Content';
import { AuthContextProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Chat from './pages/Chat';
import {FavouritesContextProvider } from './contexts/FavoritesContext';
import Feed from './pages/Feed';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

function App() {
  // const [demoUser, setDemoUser] = useState({email: "demo@email.com", username: "Demoman" })
  return (
    <div className='app-container'> 
      <AuthContextProvider>
        <FavouritesContextProvider>
        <NavBar />
          {/* <NavBar demoUser={demoUser} setDemoUser={setDemoUser} /> */}
          {/* // TODO: this could be for the guest account... */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<Error404 />} />
            <Route path='/chat' element={<Chat />} />

            <Route path='/about' element={<About />}>
              <Route path='dev' element={<Dev />} />
              <Route path='content' element={<Content />} />
            </Route>
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/character/:id/:name' element={<ProtectedRoute><Character /></ProtectedRoute>} />
          <Route path='/feed' element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          </Routes>
          </FavouritesContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
