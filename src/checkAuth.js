import React, { useState, useEffect } from 'react';
import firebase from '../src/firebase';

export const checkAuth = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
        })
          
        }, []);

    return (
        children
    )
}