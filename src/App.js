import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './components/UserForm';
import Showusers from './components/Showusers';

function App() {
  return (
    <div className="App">
      <UserForm /> 
      <Showusers />
    </div>
  );
}

export default App;
