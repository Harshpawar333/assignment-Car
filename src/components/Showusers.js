import React, { useState } from 'react'
import axios from 'axios'
function Showusers() {
    const [users,setusers]=useState([]);
    const[showUsers,setshowUsers]=useState(null);
    const getusers=async()=>{
        const response = await axios.get("https://apicars.prisms.in//user/getall");
        setusers(response.data);
    }
  return (
    <div className='List'>
        <h2>User List</h2>
        <table>
            <tr>
                <th>User-Id</th>
                <th>User-Name</th>
                <th>Phone no.</th>
            </tr>
        </table>


    </div>
  )
}

export default Showusers