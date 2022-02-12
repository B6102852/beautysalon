import './EmployeeService.css';
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import firebase from "../firebase/crud";
import 'firebase/compat/database';

function ServiceForm (props) {
    const {rowID, rowServiceName, rowPrice, clickUpdate, clickClear} = props;
    
    useEffect(() => {  
        setServiceName(rowServiceName);
        setPrice(rowPrice);
        setIsEdit(true);
        setFirstClearForm(false);
        if(firstClearForm==true) {clearService();}
        if(clickClear==true) {clearService();}
      }, [clickUpdate, clickClear]);

    const [isEdit, setIsEdit] = useState(false);
    const [firstClearForm, setFirstClearForm] = useState(true);
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState();
    
    const OnChangeServiceName = e => {
        setServiceName(e.target.value);
    }
    const OnChangePrice = e => {
        setPrice(e.target.value);
    }

    const addService = () => {
        setFirstClearForm(false);
        const serRef = firebase.database().ref('Service');
        const ser = {
            serviceName:serviceName,
            price:price,
        };
        try {
            serRef.push(ser);
            clearService();
        } catch (error) {
            console.error();
        }
    };

    const editService = () => {
        const serRef = firebase.database().ref('Service').child(rowID);
        serRef.update({
            serviceName:serviceName,
            price:price,
        });
        setIsEdit(false);
        clearService();
    };

    function clearService() {
        setServiceName('');
        setPrice('');
        setIsEdit(false);
    };

    return (           
            <div className="grid-layout-ser">
                        <font size="4">จัดการบริการ</font>
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='ชื่อบริการ'
                        value={serviceName}
                        onChange={OnChangeServiceName}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='number'
                        placeholder='ราคา'
                        value={price}
                        onChange={OnChangePrice}
                        />
                        <btn>
                            {isEdit ? (                           
                                <Link className='save-update-btn' onClick={editService} >บันทึกการแก้ไข</Link>                           
                                ) : (
                                <Link className='add-btn' onClick={addService} >เพิ่ม</Link>
                            )}
                        </btn>                
                    </div>                    
    );
}

export default ServiceForm;