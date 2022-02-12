import AppHeader from "./AppHeader";
import './EmployeeService.css';
import App from "../App";
import React, { useState } from 'react';
import auth from '../firebase';
import ServiceTable from "./ServiceTable";

function Service () {

    const [haveUser, setHaveUser] = useState(false);
    const handleAuth = auth.onAuthStateChanged(user => {
        if (user) {
          setHaveUser(true);
          return (
            handleAuth()
          );
        }
      });
    
    return (
        <emp>
            {haveUser ? (
                <emp1>
                    <AppHeader></AppHeader>
                    <ServiceTable></ServiceTable>                   
                </emp1>
            ):(
                <App/>
            )}            
        </emp>
    );
}

export default Service;