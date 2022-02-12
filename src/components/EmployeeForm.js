import './EmployeeService.css';
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import firebase from "../firebase/crud";
import 'firebase/compat/database';

function EmployeeForm (props) {
    const {rowID, rowName, rowAccount, rowPassword, rowMobile, clickUpdate, clickClear} = props;
    
    useEffect(() => {  
        setName(rowName);
        setAccount(rowAccount);
        setPassword(rowPassword);
        setMobile(rowMobile);
        setIsEdit(true);
        setFirstClearForm(false);
        if(firstClearForm==true) {clearEmployee();}
        if(clickClear==true) {clearEmployee();}
      }, [clickUpdate, clickClear]);

    const [isEdit, setIsEdit] = useState(false);
    const [firstClearForm, setFirstClearForm] = useState(true);
    const [name, setName] = useState('');
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    
    const name_handleOnChange = e => {
        setName(e.target.value);
    }
    const account_handleOnChange = e => {
        setAccount(e.target.value);
    }
    const password_handleOnChange = e => {
        setPassword(e.target.value);
    }
    const mobile_handleOnChange = e => {
        setMobile(e.target.value);
    }

    const addEmployee = () => {
        setFirstClearForm(false);
        const empRef = firebase.database().ref('Employee');
        const emp = {
            name:name,
            account:account,
            password:password,
            mobile:mobile,
        };
        try {
            empRef.push(emp);
            clearEmployee();
        } catch (error) {
            console.error();
        }
    };

    const editEmployee = () => {
        const empRef = firebase.database().ref('Employee').child(rowID);
        empRef.update({
            name:name,
            account:account,
            password:password,
            mobile:mobile,
        });
        setIsEdit(false);
        clearEmployee();
    };

    function clearEmployee() {
        setName('');
        setAccount('');
        setPassword('');
        setMobile('');
        setIsEdit(false);
    };

    return (       
        <div>
            <div className="grid-layout-emp">     
                        <font size="4">จัดการพนักงาน</font>                          
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='ชื่อ-สกุล'
                        value={name}
                        onChange={name_handleOnChange}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='สร้างบัญชีผู้ใช้'
                        value={account}
                        onChange={account_handleOnChange}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='สร้างรหัสผ่าน'
                        value={password}
                        onChange={password_handleOnChange}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='เบอร์โทร.'
                        value={mobile}
                        onChange={mobile_handleOnChange}
                        />
                        <btn>
                            {isEdit ? (                           
                                <Link className='save-update-btn' onClick={editEmployee} >บันทึกการแก้ไข</Link>                           
                                ) : (
                                <Link className='add-btn' onClick={addEmployee} >เพิ่ม</Link>
                            )}                           
                        </btn>                
            </div>           
        </div>                           
    );
}

export default EmployeeForm;