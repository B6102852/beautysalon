import AppHeader from "./AppHeader";
import './EmployeeService.css';
import {Link, Redirect} from 'react-router-dom';
import TableData from "./TableData";
import App from "../App";
import React, { useState, useEffect } from 'react';
import auth from '../firebase';
import { checkAuth } from "../checkAuth";

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
                    <div className="grid-layout-emp">
                        <font size='4'>ข้อมูลพนักงาน</font>
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='ชื่อ-สกุล'
                        //value={value}
                        //onChange={(event) => {onValueChange(event.target.value)}}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='ชื่อบัญชีผู้ใช้'
                        //value={value}
                        //onChange={(event) => {onValueChange(event.target.value)}}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='รหัสผ่าน'
                        //value={value}
                        //onChange={(event) => {onValueChange(event.target.value)}}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='number'
                        placeholder='อายุ'
                        //value={value}
                        //onChange={(event) => {onValueChange(event.target.value)}}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='เบอร์โทร.'
                        //value={value}
                        //onChange={(event) => {onValueChange(event.target.value)}}
                        />
                        <btn>
                            <Link className='add-btn' to="/emp">เพิ่ม</Link>
                            <Link className='clear-btn' to="/emp">เคลียร์</Link>
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
                </emp1>
            ):(
                <App/>
            )}
            
        </emp>
    );
}

export default Employee;