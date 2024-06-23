import React, { useState } from 'react';
import axios from "axios";
import './UserForm.css'

function UserForm() {
  const[name,setName]=useState('');
  const[phone_no,setphone_no]=useState(''); 
  const[nameerr,setnameerr]=useState(false);
  const[phone_noerr,setphone_noerr]=useState(false);
  function handlesubmit(event){
    event.preventDefault();
    if(name===''){
      setnameerr(true);
    }else{
      setnameerr(false);
    }
    if(phone_no>10){
      setphone_noerr(true);
    }else{
      setphone_noerr(false);
    }
    const formdata={
      name: name,
      phone_no: phone_no
    }
    if(
      name!== ''&&
      phone_no.length<11
    ){
      const signup=()=>{
        axios.post("https://apicars.prisms.in/user/create",formdata)
      }
      signup()
    }

  }
  return (
    <div className='userform'>
      <h1>User Form</h1>
      <form onSubmit={handlesubmit}>
        <div className="nameinput">
        <label>Name </label>
        <input type="text" value={name} placeholder="Name" onChange={(event)=>setName(event.target.value)}></input>
        {nameerr &&(<span className='errormsg'>invalid</span>)}
        </div>
        <div className="nameinput">

        <label>Phone no. </label>
        <input type="text" value={phone_no} placeholder="phone no." onChange={(event)=>setphone_no(event.target.value)}></input>
        {phone_noerr &&(<span className='errormsg'>invalid</span>)}
        
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  )
}

export default UserForm