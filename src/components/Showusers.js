import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Showusers() {
    const [users,setusers]=useState([]);
    const[showUsers,setshowUsers]=useState(null);
    useEffect(()=>{
        getusers();
    },[]);
    const getusers=async()=>{
        const response = await axios.get("https://apicars.prisms.in//user/getall");
        setusers(response.data.Users);
        console.log(response.data);

    }
  return (
    <div className='List'>
        <h2>User List</h2>
        <table>
            <thead>
            <tr>
                <th>User-Id</th>
                <th>User-Name</th>
                <th>Phone no.</th>
            </tr>
            </thead>
            <tbody>
                {users.map(user=>(
                 
                    <tr key={user.id} >
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.phone_no}</td>
                    </tr>
                 
                ))}
            </tbody>
            
        </table>


    </div>
  )
}

export default Showusers