import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function Userinfo() {
    const{id}=useParams();
    const [userinfo, setuserinfo] = useState(null);
    useEffect(()=>{
        getuserinfo();
    },[]);
    const getuserinfo = async (userId) => {
        const response = await axios.get(
          `https://apicars.prisms.in/user/get/${id}`
        );
        console.log(userId);
        setuserinfo(response.data.User);
        console.log(response.data.User);
      };
    
  return (
    <div className="userInfo">
        {id && userinfo && (
          <div className="userdetails">
            <table>
              <thead>
                <tr>
                  <th>User-Name</th>
                  <th>Phone-No</th>
                  <th>Cars</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userinfo.name}</td>
                  <td>{userinfo.phone_no}</td>
                  {userinfo.Cars.map((services) => (
                    <tr key={services.id}>
                      <td>{services.model}</td>
                    </tr>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
  )
}
export default Userinfo