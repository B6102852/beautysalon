import AppHeader from "./AppHeader";
import './EmployeeService.css';
import App from "../App";
import React, { useState } from 'react';
import auth from '../firebase';
import EmployeeTable from "./EmployeeTable";

function Employee () {

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
                    <EmployeeTable></EmployeeTable>                   
                </emp1>
            ):(
                <App/>
            )}            
        </emp>
    );
}

export default Employee;