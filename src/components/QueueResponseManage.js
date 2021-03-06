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
    const [status, setStatus] = useState('???????????????????????????');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [anchorE3, setAnchorE3] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const open2 = Boolean(anchorE2);
    const open3 = Boolean(anchorE3);
    const id1 = open1 ? 'simple-popover' : undefined;
    const id2 = open2 ? 'simple-popover' : undefined;
    const id3 = open3 ? 'simple-popover' : undefined;
    const [holdThisRow, setHoldThisRow] = React.useState();
    const [holdThisIndex, setHoldThisIndex] = React.useState();

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
            status:'???????????????????????????',
            adjourn:null,
        };
        try {
            queueRef.push(queue);
            clearQueue();
        } catch (error) {
            console.error();
        }
    };

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
            status:'????????????',
        });
        handleClose1();
    };

    const ClickBusy = (event, rowID, index) => {
        setAnchorE2(event.currentTarget);
        setHoldThisRow(rowID); 
        setHoldThisIndex(index);
    };
    const confirmBusy = () => {
        const queueRef = firebase.database().ref('Queue').child(holdThisRow);
        queueRef.update({
            status:'?????????????????????',
        });
        handleClose2();
    };

    const ClickAdJourn = (event, rowID, index) => {
        setAnchorE3(event.currentTarget);
        setHoldThisRow(rowID); 
        setHoldThisIndex(index);
    };
    const confirmAdJourn = () => {
        const queueRef = firebase.database().ref('Queue').child(holdThisRow);
        queueRef.update({
            status:'?????????????????????',
        });
        handleClose3();
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
                        placeholder='??????????????????????????????'
                        value={nameCustomer}
                        onChange={nameCustomerOnChange}
                        />
                        <input
                        className='text-input-emp-ser'
                        type='text'
                        placeholder='?????????.'
                        value={telCustomer}
                        onChange={telCustomerOnChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">??????????????????</InputLabel>
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
                        placeholder='??????????????????'
                        value={day}
                        onChange={dayOnChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField
                        className='text-input-emp-ser'
                        type='time'
                        placeholder='????????????'
                        value={time}
                        onChange={timeOnChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        
                        <Link className='add-btn' onClick={addQueue} >???????????????</Link>
                        <Link className='clear-btn-ser' onClick={clearQueue} >?????????????????????</Link>
            </div>
            <div>
                <div className="layout-font">
                    <font size='4'>???????????????????????????</font>
                </div>
                <div className="grid-layout-queue">
                    <TextField
                    id="date"
                    label="????????????????????????????????????"
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
                            placeholder='???????????????????????????????????????'
                            name="search"
                        />
                        <Link className='search-btn-queue'><i class="fa fa-search"></i></Link>  
                    </div>                 
                    <Link className='clear-btn-queue'>???????????????????????????</Link>
                </div>    
                <div className="layout-tb-queue">
                    <TableContainer component={Paper} style={{ height: 370, width: '100%' }}>
                    <Table className={classes.table} aria-label="customized table" stickyHeader aria-label="sticky table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">???????????????</StyledTableCell>
                            <StyledTableCell align="center">??????????????????????????????</StyledTableCell>
                            <StyledTableCell align="center">?????????.&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">??????????????????&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">??????????????????&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">????????????&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">??????????????????&nbsp;</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {queueList.filter((queues) => {
                            return queues.status.includes('???????????????????????????')      
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
                                        ???????????????????????????&nbsp;<b>"????????????"</b>&nbsp;???????????????????????????????????? {holdThisIndex+1} ?????????????????????????????? ?<br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;
                                        <Link className='confirm-free-btn' onClick={confirmFree}>??????????????????</Link>
                                        <Link className='cancle-btn' onClick={handleClose1}>??????????????????</Link>
                                    </Typography>
                                </Popover>
                                <Popover id={id2}
                                        open={open2}
                                        anchorEl={anchorE2}
                                        onClose={handleClose2}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left', }}  
                                >
                                    <Typography sx={{ p: 2 }}>
                                        ???????????????????????????&nbsp;<b>"?????????????????????"</b>&nbsp;???????????????????????????????????? {holdThisIndex+1} ?????????????????????????????? ?<br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link className='confirm-busy-btn' onClick={confirmBusy}>??????????????????</Link>
                                        <Link className='cancle-btn' onClick={handleClose2}>??????????????????</Link>
                                    </Typography>
                                </Popover>
                                <Popover id={id3}
                                        open={open3}
                                        anchorEl={anchorE3}
                                        onClose={handleClose3}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left', }}  
                                >
                                    <Typography sx={{ p: 2 }}>
                                        ?????????????????????????????????????????????????????? {holdThisIndex+1}<br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <TextField
                                            className='text-input-emp-ser'
                                            type='date'
                                            placeholder='???????????????????????????'
                                            //value={day}
                                            //onChange={dayOnChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <Link className='confirm-free-btn' /*onClick={confirmBusy}*/>??????????????????</Link>
                                        <Link className='cancle-btn' /*onClick={handleClose2}*/>??????????????????</Link>
                                    </Typography>
                                </Popover>
                                <Link className='free-btn' onClick={(event) => {
                                    ClickFree(event,row.id,index);
                                    }}>????????????</Link>
                                <Link className='delete-btn' onClick={(event) => {
                                    ClickBusy(event,row.id,index)}}>?????????????????????</Link>    
                                <Link className='update-btn' onClick={(event) => {
                                    ClickAdJourn(event,row.id,index)}}>???????????????????????????</Link>                  
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