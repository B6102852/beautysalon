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
import ServiceForm from './ServiceForm';
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
  
  function ServiceTable () {
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [holdThisRow, setHoldThisRow] = React.useState();
    const [holdThisIndex, setHoldThisIndex] = React.useState();
    const [rowID, setRowID] = React.useState();
    const [rowServiceName, setRowServiceName] = React.useState();
    const [rowPrice, setRowPrice] = React.useState();
    const [clickUpdate, setClickUpdate] = useState(false);
    const [clickClear, setClickClear] = useState(false);
    const classes = useStyles();
    const [serviceList, setServiceList] = useState([]);
    const [search, setSearch] = useState('');

    const onChangeSearch = e => {
      setSearch(e.target.value);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    function ClickDelete (event, rowID, index) {
      setAnchorEl(event.currentTarget);
      setHoldThisRow(rowID);
      setHoldThisIndex(index);
    };

    function confirmToDelete() {
      const serRef = firebase.database().ref('Service').child(holdThisRow);
      serRef.remove();
      handleClose();
    };

    function ClickUpdate(rowID, rowServiceName, rowPrice) {
      setRowID(rowID); setRowServiceName(rowServiceName); setRowPrice(rowPrice);
      setClickUpdate(!clickUpdate);
    };

    function clearService() {
      setClickUpdate(!clickUpdate);
      setClickClear(true);
      setRowID(''); setRowServiceName(''); setRowPrice('');
      setSearch('');
    };

    useEffect(() => {
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

    return (
      <div className='grid-form-table'>
        <ServiceForm rowID={rowID} rowServiceName={rowServiceName} rowPrice={rowPrice} 
            clickUpdate={clickUpdate} clickClear={clickClear} />
        <Link className='clear-btn-ser' onClick={clearService} >เคลียร์</Link> 
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
                  <StyledTableCell align="center">ชื่อบริการ</StyledTableCell>
                  <StyledTableCell align="center">ราคา&nbsp;</StyledTableCell>
                  <StyledTableCell align="center">จัดการ&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {serviceList.filter((sers) => {
                    return sers.serviceName.includes(search)
                    }).map((row, index) => {
                    return  <StyledTableRow key={index}>                   
                      <StyledTableCell align="left" >{index+1}</StyledTableCell>
                      <StyledTableCell align="center">{row.serviceName}</StyledTableCell>
                      <StyledTableCell align="center">{row.price}</StyledTableCell>
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
                            ClickUpdate(row.id, row.serviceName, row.price);
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
  export default ServiceTable;

