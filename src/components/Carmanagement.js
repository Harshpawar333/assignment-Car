import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import cardata from "./cardata.json";
import { useNavigate } from "react-router-dom";

function Carmanagement() {
  const [cars, setcars] = useState(cardata.Cars);
  const [addcar, setaddcars] = useState(false);
  const [showcars, setshowcars] = useState(false);
  const [model, setmodel] = useState("");
  const [id, setid] = useState("");
//   const [color,setcolor]=useState("");
//   const [purchasedate,setpurchasedate]=useState("");
//   const [Servicing,setservicing]=useState("");
//   const [useridata,setuseridata]=useState([]);
  const [checkuser,setcheckuser]=useState(false);
  const Navigate = useNavigate();
//   const carinfo={

//   }
//   const form={
//     Id:id,
//     Model:model,
//     Color:color,
//     'Purchase-date':purchasedate,
//     Servicing:Servicing 
//   }

  const showCars = async () => {
    setshowcars(!showcars);
    setaddcars(false);
    setcars(cardata.Cars);//added for push purpose 
  };
  const addcars = async () => {
    setaddcars(!addcar);
    setshowcars(false);
  };
  //   const getcardata = async () => {
  //     const cardata = await axios.get("https://apicars.prisms.in/car/get/3");
  //     setcars(cardata.Cars);
  //   };
  const handlecarclick = async () => {};
  const useridauth=async(e)=>{
    e.preventDefault();
    const userdata=await axios.get("https://apicars.prisms.in//user/getall")
    const userauth=userdata.data.Users.find(user=>user.id===parseInt(id));
    setcheckuser(userauth===undefined);
  }
  return (
    <div className="userform">
      <h1>Car Management</h1>
      <div className="buttoncon">
        <button className="button" onClick={showCars}>
          Display All Cars
        </button>
        <button className="button" onClick={addcars}>
          Create new car record
        </button>
      </div>
      <Tabs>
        <TabList>
          {showcars && <Tab>Cars List</Tab>}
          {addcar && <Tab>Add Record</Tab>}
        </TabList>
        {showcars && (
          <TabPanel>
            <div className="tablee">
              <table>
                <thead>
                  <th>Model</th>
                  <th>purchase-date</th>
                  <th>Servicing</th>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id} onClick={() => handlecarclick(car.id)}>
                      <td>{car.model}</td>
                      <td>{car.purchasedate}</td>
                      <td>
                        <table>
                          <tbody>
                            {car.Servicing.map((service) => (
                              <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>{service.servicing_date}</td>
                                <td>{service.Status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        )}
        {addcar && (
          <div className="userform1">
            <form>
              <label>Id</label>
              <input
                type="text"
                value={id}
                onChange={(event) => setid(event.target.value)}
              ></input>
              <button onClick={()=>useridauth}>check user</button>
              {checkuser&&<span>create user first</span>}
              <label>model</label>
              <input
                value={model}
                type="text"
                onChange={(event) => setmodel(event.target.value)}
              ></input>
            </form>
          </div>
        )}
      </Tabs>
      <div className="connection">
        <button className="button" onClick={() => Navigate(`/`)}>
          User Management
        </button>
      </div>
    </div>
  );
}

export default Carmanagement;
