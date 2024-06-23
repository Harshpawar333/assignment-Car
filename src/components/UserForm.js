import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserForm.css";

function UserForm() {
  const [users, setusers] = useState([]);
  const [showUsers, setshowUsers] = useState(false);
  const [name, setName] = useState("");
  const [phone_no, setphone_no] = useState("");
  const [nameerr, setnameerr] = useState(false);
  const [phone_noerr, setphone_noerr] = useState(false);
  const [showform, setshowform] = useState(false);
  const [userid, setuserid] = useState(null);
  const [userinfo, setuserinfo] = useState(null);

  useEffect(() => {
    getusers();
    getcardata();
  }, []);
  const getusers = async () => {
    const response = await axios.get("https://apicars.prisms.in//user/getall");
    setusers(response.data.Users);
    console.log(response.data);
  };
  const getcardata = async () => {
    const cardata = await axios.get("https://apicars.prisms.in/car/get/3");
    console.log(cardata);
  };
  function handlesubmit(event) {
    event.preventDefault();
    if (name === "") {
      setnameerr(true);
    } else {
      setnameerr(false);
    }
    if (phone_no > 10) {
      setphone_noerr(true);
    } else {
      setphone_noerr(false);
    }
    const formdata = {
      name: name,
      phone_no: phone_no,
    };
    if (name !== "" && phone_no.length < 11) {
      const signup = () => {
        axios.post("https://apicars.prisms.in/user/create", formdata);
      };
      signup();
    }
  }
  const Showform = () => {
    setshowform(!showform);
    setshowUsers(false);
    setuserid(null);
  };
  const showw = () => {
    setshowUsers(!showUsers);
    setshowform(false);
    setuserid(null)
  };
  const getuserinfo = async (userId) => {
    const response = await axios.get(
      `https://apicars.prisms.in/user/get/${userId}`
    );
    setuserinfo(response.data.User);
    console.log(response.data.User);
  };
  const handleuserclick = (userId) => {
    if (userid === userId) {
      setuserid(null);
      setuserinfo(null);
    } else {
      setuserid(userId);
      getuserinfo(userId);
    }
  };
  return (
    <div className="userform">
      <div className="buttoncon">
        <button onClick={showw} className="button">
          User List
        </button>
        <button className="button" onClick={Showform}>
          Create New User
        </button>
      </div>
      {showform && (
        <div className="userform">
          <form onSubmit={handlesubmit}>
            <div className="nameinput">
              <label>Name </label>
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}
              ></input>
              {nameerr && <span className="errormsg">invalid</span>}
            </div>
            <div className="nameinput">
              <label>Phone no. </label>
              <input
                type="text"
                value={phone_no}
                placeholder="phone no."
                onChange={(event) => setphone_no(event.target.value)}
              ></input>
              {phone_noerr && <span className="errormsg">invalid</span>}
            </div>
            <button type="submit">Add User</button>
          </form>
        </div>
      )}
      {showUsers && (
        <div className="tablee">
          <table>
            <thead>
              <tr>
                <th className="userid">User-Id</th>
                <th>User-Name</th>
                <th>Phone no.</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} onClick={() => handleuserclick(user.id)}>
                  <td className="userid">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phone_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <table>
          {userid && userinfo && (
            <div className="userdetails">
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
            </div>
          )}
        </table>
      </div>
    </div>
  );
}

export default UserForm;
