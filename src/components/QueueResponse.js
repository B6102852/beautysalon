import AppHeader from "./AppHeader";
import './QueueServiceHistory.css';
import React, { useState } from 'react';
import auth from '../firebase';
import App from "../App";
import QueueResponseManage from "./QueueResponseManage";

function QueueResponse () {

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
        <queue>
            {haveUser ? (
                <queue1>
                    <AppHeader></AppHeader>
                    <QueueResponseManage></QueueResponseManage>
                </queue1>
            ):(
                <App/>
            )}
            
        </queue>
    );
}

export default QueueResponse;