import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import firebase from "../firebase/crud";
import 'firebase/compat/database';
import {Link} from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import EmployeeForm from './EmployeeForm';
import './EmployeeService.css';

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
  
  function EmployeeTable () {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [holdThisRow, setHoldThisRow] = React.useState();
    const [holdThisIndex, setHoldThisIndex] = React.useState();
    const [rowID, setRowID] = React.useState();
    const [rowName, setRowName] = React.useState();
    const [rowAccount, setRowAccount] = React.useState();
    const [rowPassword, setRowPassword] = React.useState();
    const [rowMobile, setRowMobile] = React.useState();
    const [clickUpdate, setClickUpdate] = useState(false);
    
    const [search, setSearch] = useState('');
    const [clickClear, setClickClear] = useState(false);
    const classes = useStyles();
    const [employeeList, setEmployeeList] = useState([]);

    const handleClose = () => {
      setAnchorEl(null);
    };

    function ClickDelete (event, rowID, index) {
      setAnchorEl(event.currentTarget);
      setHoldThisRow(rowID);
      setHoldThisIndex(index);
    };

    function confirmToDelete() {
      const empRef = firebase.database().ref('Employee').child(holdThisRow);
      empRef.remove();
      handleClose();
    };

    function ClickUpdate(rowID, rowName, rowAccount, rowPassword, rowMobile) {
      setClickClear(false);
      setRowID(rowID); setRowName(rowName); setRowAccount(rowAccount);
      setRowPassword(rowPassword); setRowMobile(rowMobile);
      setClickUpdate(!clickUpdate);
    };

    function clearEmployee() {
      setClickUpdate(!clickUpdate);
      setClickClear(true);
      setRowID(''); setRowName(''); setRowAccount('');
      setRowPassword(''); setRowMobile('');
      setSearch('');
    };

    const onChangeSearch = e => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const empRef = firebase.database().ref('Employee');
        empRef.on('value', (snapshot) => {
        const emps = snapshot.val();
        const empList = [];
        for (let id in emps) {
            empList.push({ id, ...emps[id] });
        }
        setEmployeeList(empList);
        });
    }, []);

    return (
      <div className='grid-form-table'>
        <EmployeeForm rowID={rowID} rowName={rowName} rowAccount={rowAccount} rowPassword={rowPassword} 
              rowMobile={rowMobile} clickUpdate={clickUpdate} clickClear={clickClear}/> 
        <Link className='clear-btn-emp' onClick={clearEmployee} >เคลียร์</Link>      
        <div className="table-emp">
            <div className="header-search-text-emp">                  
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <input 
                    className="search-emp-text"
                    type='text'
                    placeholder='ค้นหา'
                    //name="search"
                    value={search}
                    onChange={onChangeSearch}
                />
                <button disabled className='search-btn' ><i class="fa fa-search"></i></button>
            </div>   
            <TableContainer component={Paper} style={{ height: 485, width: '100%' }}>
              <Table className={classes.table} aria-label="customized table" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">ลำดับ</StyledTableCell>
                    <StyledTableCell align="center">ชื่อ-สกุล</StyledTableCell>
                    <StyledTableCell align="center">บัญชีผู้ใช้&nbsp;</StyledTableCell>
                    <StyledTableCell align="center">รหัสผ่าน&nbsp;</StyledTableCell>
                    <StyledTableCell align="center">โทร.&nbsp;</StyledTableCell>
                    <StyledTableCell align="center">จัดการ&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeList.filter((emps) => {
                    return emps.name.includes(search)      
                      }).map((row, index) => {
                      return  <StyledTableRow key={index}>                   
                        <StyledTableCell align="left" >{index+1}</StyledTableCell>
                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                        <StyledTableCell align="center">{row.account}</StyledTableCell>
                        <StyledTableCell align="center">{row.password}</StyledTableCell>
                        <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Popover id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left', }}  
                          >
                            <Typography sx={{ p: 2 }}>
                                ต้องการลบข้อมูลแถวที่ {holdThisIndex+1} ใช่หรือไม่ ?<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link className='update-btn' onClick={confirmToDelete}>ใช่</Link>
                                <Link className='delete-btn' onClick={handleClose}>ยกเลิก</Link>
                            </Typography>
                          </Popover>
                          <Link className='update-btn' onClick={() => {
                              ClickUpdate(row.id, row.name, row.account, row.password, row.mobile);
                            }}>แก้ไข</Link>
                          <Link className='delete-btn' onClick={(event) => {
                            ClickDelete(event,row.id,index)}}>ลบ</Link>                    
                      </StyledTableCell>
                    </StyledTableRow>
                      })
                  }               
                </TableBody>
              </Table>
            </TableContainer>
        </div>
      </div>
    );
  }
  export default EmployeeTable;

