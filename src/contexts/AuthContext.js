import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userChecked, setUserSchecked] = useState(false);
  const navigate = useNavigate();

  const createNewUser = (email, password, callback) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        console.log(newUser);
        alert("Sign up successful - now please log in");
        callback && callback();
      })
      .catch((error) => {
        console.error("Error creating new user:", error.message);
        alert(`Sign up failed: ${error.message}`);
      });
  };

  const logIn = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const loggedUser = userCredential.user;
        setUser(loggedUser);
        alert("Log in succesful!!!");
        callback && callback();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage :>> ", errorMessage);
        console.log('errorCode :>> ', errorCode);
      });
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("user logged out");
        alert("You have logged out");
        navigate('/');

      })
      .catch((error) => {
        console.log(error);
      });
  };


  const checkForCurrentUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserSchecked(true);
      } else {
        setUser(null);
        setUserSchecked(true);
      }
    });
  };

  useEffect(() => {
    checkForCurrentUser();
  }, []);

  console.log("current user", user);
  return (
    <AuthContext.Provider
      value={{ user, logIn, logOut, createNewUser, userChecked }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
