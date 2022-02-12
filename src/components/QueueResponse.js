import AppHeader from "./AppHeader";
import './QueueServiceHistory.css';
import TableData from "./TableData";
//import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {Link, Redirect} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import auth from '../firebase';
import App from "../App";

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

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

    const classes = useStyles();
    return (
        <queue>
            {haveUser ? (
                <queue1>
                    <AppHeader></AppHeader>
                    <div className="layout-font">
                        <font size='4'>ตอบรับคิว</font>
                    </div>
                    <div className="grid-layout-queue">
                        <TextField
                        id="date"
                        label="ค้นจากวันที่"
                        type="date"
                        //defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        /> 
                        <div>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <input 
                            className="search-queue"
                            type='text'
                            placeholder='ค้นชื่อลูกค้า'
                            name="search"
                            />
                            <Link className='search-btn-queue'><i class="fa fa-search"></i></Link>  
                        </div>                 
                        <Link className='clear-btn-queue'>ดูทั้งหมด</Link>
                    </div>    
                    <div className="layout-tb-queue">
                        <TableData/>
                    </div>
                </queue1>
            ):(
                <App/>
            )}
            
        </queue>
    );
}

export default QueueResponse;