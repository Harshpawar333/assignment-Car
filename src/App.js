import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './components/UserForm';// Adjust the import to match the correct case
import Showusers from './components/Showusers';

function App() {
  return (
    <div className="App">
      <UserForm /> {/* Use the component with the correct case */}
      <Showusers />
    </div>
  );
}

export default App;
