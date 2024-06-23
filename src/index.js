import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Carmanagement from './components/Carmanagement';
import UserForm from './components/UserForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Userinfo from './components/Userinfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Router>
      <Routes>
        <Route exact path='/' element={<UserForm/>} />
        <Route path='/carmanagement' element={<Carmanagement/>} />
        <Route path='/Userinfo/:id' element={<Userinfo/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
