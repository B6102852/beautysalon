import './QueueServiceHistory.css';
import TableData from "./TableData";
import TextField from '@material-ui/core/TextField';
//import { makeStyles } from '@material-ui/core/styles';
import {Link, Redirect} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import auth from '../firebase';
import firebase from "../firebase/crud";
import 'firebase/compat/database';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

function QueueResponseManage() {

    useEffect(() => {
        const queueRef = firebase.database().ref('Queue');
        queueRef.on('value', (snapshot) => {
        const queues = snapshot.val();
        const qList = [];
        for (let id in queues) {
            qList.push({ id, ...queues[id] });
        }
        setQueueList(qList); 
        });

        const serRef = firebase.database().ref('Service');
        serRef.on('value', (snapshot) => {
        const sers = snapshot.val();
        const serList = [];
        for (let id in sers) {
            serList.push({ id, ...sers[id] });
        }
        setServiceList(serList); 
        });
        
    }, []);

    const [serviceList, setServiceList] = useState([]);
    const [queueList, setQueueList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [firstClearForm, setFirstClearForm] = useState(true);

    const [nameCustomer, setNameCustomer] = useState('');
    const [telCustomer, setTelCustomer] = useState('');
    const [service, setService] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('รอตอบกลับ');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [anchorE3, setAnchorE3] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const open2 = Boolean(anchorE2);
    const open3 = Boolean(anchorE3);
    const id1 = open1 ? 'simple-popover' : undefined;
    const [holdThisRow, setHoldThisRow] = React.useState();
    const [holdThisIndex, setHoldThisIndex] = React.useState();

    const handleClose1 = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorE2(null);
    };

    const handleClose3 = () => {
        setAnchorE3(null);
    };

    const ClickFree = (event, rowID, index) => {
        setAnchorEl(event.currentTarget);
        setHoldThisRow(rowID); 
        setHoldThisIndex(index);
    };
    const confirmFree = () => {
        const queueRef = firebase.database().ref('Queue').child(holdThisRow);
        queueRef.update({
            status:'ว่าง',
        });
        handleClose1();
    };

    const ClickBusy = (event, rowID, index) => {
        setHoldThisRow(rowID); setHoldThisIndex(index);
        setAnchorE2(event.currentTarget);
    };

    const ClickAdJourn = (event, rowID, index) => {
        setHoldThisRow(rowID); setHoldThisIndex(index);
        setAnchorE3(event.currentTarget);
    };


    const nameCustomerOnChange = e => {
        setNameCustomer(e.target.value);
    }
    const telCustomerOnChange = e => {
        setTelCustomer(e.target.value);
    }
    const serviceOnChange = e => {
        setService(e.target.value);
    }
    const dayOnChange = e => {
        setDay(e.target.value);
    }
    const timeOnChange = e => {
        setTime(e.target.value);
    }

    const addQueue = () => {
        setFirstClearForm(false);
        const queueRef = firebase.database().ref('Queue');
        const queue = {
            nameCustomer:nameCustomer,
            telCustomer:telCustomer,
            service:service,
            day:day,
            time:time,
            status:'รอตอบกลับ',
        };
        try {
            queueRef.push(queue);
            clearQueue();
        } catch (error) {
            console.error();
        }
    };

    function clearQueue() {
        setNameCustomer('');
        setTelCustomer('');
        setService('');
        setDay('');
        setTime('');
    };

    return(
        <div className='table-response'>
            <div>
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='ชื่อลูกค้า'
                        value={nameCustomer}
                        onChange={nameCustomerOnChange}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='โทร.'
                        value={telCustomer}
                        onChange={telCustomerOnChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">บริการ</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={service}
                            label="Age"
                            onChange={serviceOnChange}
                            >
                            {serviceList.map((menu, index) => {
                                return <MenuItem value={menu.serviceName}>{menu.serviceName}</MenuItem>
                            })}
                            </Select>
                        </FormControl>                        
                        <TextField
                        className='text-input-emp-ser'
                        type='date'
                        placeholder='วันที่'
                        value={day}
                        onChange={dayOnChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField
                        className='text-input-emp-ser'
                        type='time'
                        placeholder='เวลา'
                        value={time}
                        onChange={timeOnChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        
                        <Link className='add-btn' onClick={addQueue} >เพิ่ม</Link>
                        <Link className='clear-btn-ser' onClick={clearQueue} >เคลียร์</Link>
            </div>
            <div>
                <div className="layout-font">
                    <font size='4'>ตอบรับคิว</font>
                </div>
                <div className="grid-layout-queue">
                    <TextField
                    id="date"
                    label="ค้นจากวันที่"
                    type="date"
                    //defaultValue="2017-05-24"
                    //className={classes.textField}
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
                    <TableContainer component={Paper} style={{ height: 485, width: '100%' }}>
                    <Table className={classes.table} aria-label="customized table" stickyHeader aria-label="sticky table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">ลำดับ</StyledTableCell>
                            <StyledTableCell align="center">ชื่อลูกค้า</StyledTableCell>
                            <StyledTableCell align="center">โทร.&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">บริการ&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">วันที่&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">เวลา&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">ตอบรับ&nbsp;</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {queueList.filter((queues) => {
                            return queues.status.includes('รอตอบกลับ')      
                            }).map((row, index) => {
                            return  <StyledTableRow key={index}>                   
                                <StyledTableCell align="left" >{index+1}</StyledTableCell>
                                <StyledTableCell align="center">{row.nameCustomer}</StyledTableCell>
                                <StyledTableCell align="center">{row.telCustomer}</StyledTableCell>
                                <StyledTableCell align="center">{row.service}</StyledTableCell>
                                <StyledTableCell align="center">{row.day}</StyledTableCell>
                                <StyledTableCell align="center">{row.time}</StyledTableCell>
                                <StyledTableCell align="center">
                                <Popover id={id1}
                                        open={open1}
                                        anchorEl={anchorEl}
                                        onClose={handleClose1}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left', }}  
                                >
                                    <Typography sx={{ p: 2 }}>
                                        ตอบรับคิว&nbsp;"ว่าง"&nbsp;แถวที่ {holdThisIndex+1} ใช่หรือไม่ ?<br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link className='update-btn' onClick={confirmFree}>ใช่</Link>
                                        <Link className='delete-btn' onClick={handleClose1}>ยกเลิก</Link>
                                    </Typography>
                                </Popover>
                                <Link className='update-btn' onClick={(event) => {
                                    ClickFree(event,row.id,index);
                                    }}>ว่าง</Link>
                                <Link className='delete-btn' onClick={(event) => {
                                    ClickBusy(event,row.id,index)}}>ไม่ว่าง</Link>    
                                <Link className='delete-btn' onClick={(event) => {
                                    ClickAdJourn(event,row.id,index)}}>เลื่อนนัด</Link>                  
                            </StyledTableCell>
                            </StyledTableRow>
                            })
                        }               
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            </div>
            
        </div>
    );
}

export default QueueResponseManage;