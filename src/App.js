import './App.css';
import {Link, Redirect} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import auth from '../src/firebase';
import Employee from './components/Employee';

function App() {
  
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 

  const handleLogin = async () => {
    try {
      const response = await auth.signInWithEmailAndPassword(
        username,
        password
      );

      const { user } = response;

      setSession({
        isLoggedIn: true,
        currentUser: user
      });   
      
    } catch (error) {
      alert(error);
      setSession({
        isLoggedIn: false,
        currentUser: null,
        errorMessage: error.message
      });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        username,
        password
      );

      const { user } = response;

      setSession({
        isLoggedIn: true,
        currentUser: user
      });
    } catch (error) {
      setSession({
        isLoggedIn: false,
        currentUser: null,
        errorMessage: error.essage
      });
    }
  };

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  return (
    <app>
      {session.isLoggedIn ? (<Redirect to="/emp"/>):(
        <div className='bg-login'>
        <div className='section-login'>
          <div className='grid-login'>
            <img src="/images/logo.png"/>
            <input
                className='text-input'
                type='email'
                placeholder='ชื่อผู้ใช้'
                onChange={handleUsername}
            >
            </input>
            <input
                className='text-input'
                type='password'
                placeholder='รหัสผ่าน'
                onChange={handlePassword}
            >
            </input>
            <Link className='login-btn' type="submit" onClick={handleLogin} >เข้าสู่ระบบ</Link>
          </div>
        </div>
      </div>
      )}
    </app>
  );
}

export default App;
