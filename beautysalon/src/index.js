import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Employee from './components/Employee';
import Service from './components/Service';
import QueueResponse from './components/QueueResponse';
import QueueHistory from './components/QueueHistory';
import QueueToday from './components/QueueToday';
import ServiceHistory from './components/ServiceHistory';

ReactDOM.render(
  <Router  >  
      <Route exact path='/' component={App}/>
      <Route path='/emp' component={Employee}/>
      <Route path='/ser' component={Service}/>
      <Route path='/queue' component={QueueResponse}/>
      <Route path='/queue-history' component={QueueHistory}/>
      <Route path='/queue-today' component={QueueToday}/>
      <Route path='/service-history' component={ServiceHistory}/>
  </Router>,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
