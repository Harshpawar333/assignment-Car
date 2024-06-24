import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserForm.css";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function UserForm() {
  const [users, setusers] = useState([]);
  const [showUsers, setshowUsers] = useState(true);
  const [name, setName] = useState("");
  const [phone_no, setphone_no] = useState("");
  const [nameerr, setnameerr] = useState(false);
  const [phone_noerr, setphone_noerr] = useState(false);
  const [showform, setshowform] = useState(false);
  const [validate,setvalidate]=useState(false);

  const Navigate = useNavigate();
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
  const handlesubmit = async (event) => {
    event.preventDefault();
    if (name === "") {
      setnameerr(true);
    } else {
      setnameerr(false);
    }
    if (phone_no < 11) {
      setphone_noerr(true);
    } else {
      setphone_noerr(false);
    }
    const formdata = {
      name: name,
      phone_no: phone_no,
    };
    const checkuser1 = async(phone_no) => {
        const response=await axios.get("https://apicars.prisms.in//user/getall")
        const userstaus=response.data.Users.find(user=> user.phone_no===phone_no);
        return userstaus === undefined;
    };
    if (name !== "" && phone_no.length < 11) {
      const checkuserstatus = await checkuser1(phone_no);
      if (checkuserstatus) {
        const signup = () => {
          axios.post("https://apicars.prisms.in/user/create", formdata);
          setvalidate(false);
        };
        signup();
      }else{
        setvalidate(true);
      }
      
    }
  };

  const Showform = () => {
    setshowform(!showform);
    setshowUsers(false);
  };
  const showw = () => {
    setshowUsers(!showUsers);
    setshowform(false);
  };
  const handleuserclick = (userId) => {
    Navigate(`/userinfo/${userId}`);
  };

  return (
    <div className="userform">
      <h1>User Management</h1>
      <div className="buttoncon">
        <button onClick={showw} className="button">
          User List
        </button>
        <button className="button" onClick={Showform}>
          Create New User
        </button>
      </div>
      <Tabs>
        <TabList>
          {showUsers && <Tab>User List</Tab>}
          {showform && <Tab>Create New User</Tab>}
        </TabList>

        {showform && (
          <TabPanel>
            <div className="userform1">
              <form onSubmit={handlesubmit}>
                <div className="nameinput">
                  <label>Name </label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Harsh Pawar"
                    onChange={(event) => setName(event.target.value)}
                  ></input>
                </div>
                <div className="nameinput">
                  <label>Phone no. </label>
                  <input
                    type="number"
                    value={phone_no}
                    placeholder="7840985216"
                    onChange={(event) => setphone_no(event.target.value)}
                  ></input>
                  
                </div>

                <button className="adduser" type="submit">
                  Add User
                </button>
              </form>
            </div>
            {validate&&<span>User Already Registered</span>}
            {phone_noerr && <span className="errormsg">Phone no should be of 10 digits</span>}
            {nameerr && <span className="errormsg">Name cannot be empty</span>}



          </TabPanel>
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
      </Tabs>
      <div className="connection"><button  className='button'onClick={()=>Navigate(`/carmanagement`)}>Car Management</button></div>
    </div>
  );
}

export default UserForm;
