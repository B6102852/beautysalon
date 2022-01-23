import AppHeader from "./AppHeader";
import './EmployeeService.css';
import {Link, Redirect} from 'react-router-dom';
import TableData from "./TableData";
import React, { useState, useEffect } from 'react';
import auth from '../firebase';
import App from "../App";

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
        <ser>
            {haveUser ? (
                <ser1>
                    <AppHeader></AppHeader>
                    <div className="grid-layout-ser">
                        <font size='4'>ข้อมูลบริการ</font>
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='ชื่อบริการ'
                        //value={value}
                        //onChange={(event) => {onValueChange(event.target.value)}}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='number'
                        placeholder='ราคา'
                        //value={value}
                        //onChange={(event) => {onValueChange(event.target.value)}}
                        />
                        <btn>
                            <Link className='add-btn' to="/ser">เพิ่ม</Link>
                            <Link className='clear-btn' to="/ser">เคลียร์</Link>
                        </btn>                
                    </div>
                    <div className="layout-tb">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                        <input 
                        className="search-emp-ser"
                        type='text'
                        placeholder='ค้นหา'
                        name="search"
                        />
                        <Link className='search-btn'><i class="fa fa-search"></i></Link>
                        <TableData/>
                    </div>
                </ser1>
            ):(
                <App/>
            )}
            
        </ser>
    );
}

export default Service;