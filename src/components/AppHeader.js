import "./AppHeader.css";
import {Link} from 'react-router-dom';
import React, { useState, useEffect, useContext, Component } from 'react';
import auth from '../firebase';
import { Redirect } from 'react-router-dom'

function AppHeader() {

    const [haveUser, setHaveUser] = useState(true);
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {   
        const handleAuth = auth.onAuthStateChanged(user => {
          if (user) {
            setHaveUser(true);
            setCurrentUser(user);
            return (
              <checkAuth/>
            );
          }
        });   
        return () => {
          handleAuth();
        };       
      }, []);
    
    const handleLogout = () => {
        auth.signOut().then(response => {
          setHaveUser(false);
        });
    };   
    
    return (
      <head1>
         {haveUser ? (
            <header className="header">        
            <img className="logo" src="/images/logo.png" />
            <div className="menu">
                <Link className='menu-btn' to="/emp">จัดการพนักงาน</Link>
                <Link className='menu-btn' to="/ser">จัดการบริการ</Link>
                <Link className='menu-btn' to="/queue">ตอบรับคิว</Link>
                <Link className='menu-btn' to="/queue-history">ประวัติตอบรับคิว</Link>
                <Link className='menu-btn' to="/queue-today">คิววันนี้</Link>
                <Link className='menu-btn' to="/service-history">ประวัติเข้ารับบริการ</Link>
            </div> 
            <div className="currentUser-logout">
                <div className="margin-currentUser">
                    <b>{currentUser.email}</b>
                </div>
                <div className="logout-area">
                    <img src="/images/iconUser.png" />
                    <Link className='logout-btn' onClick={handleLogout} >ออกจากระบบ</Link>
                </div>
            </div>
            </header>
       
         ):(
          <Redirect to="/"/>
         )}         
      </head1>
  );

}

export default AppHeader;