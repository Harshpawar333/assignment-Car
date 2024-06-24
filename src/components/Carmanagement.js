import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import cardata from "./cardata.json";
import { useNavigate } from "react-router-dom";
import cardata1 from "./cardata1.json";

function Carmanagement() {
  const cars = cardata.Cars;
  const cardatabase = cardata1.Cars;
  const [addcar, setaddcars] = useState(false);
  const [showcars, setshowcars] = useState(false);
  const [showservice, setshowservice] = useState(false);
  const [createservice, setcreateservice] = useState(false);
  const [model, setmodel] = useState("");
  const [id, setid] = useState("");
  const [color, setcolor] = useState("");
  const [purchasedate, setpurchasedate] = useState("");
  const [carid, setcarid] = useState("");
  const [servicing_date, setservicing_date] = useState("");
  const [status, setstatus] = useState("");
  const Navigate = useNavigate();
  const [validation, setvalidation] = useState(false);
  const Servicingrecord = {
    carid: carid,
    servicing_date: servicing_date,
    status: status,
  };

  const form = {
    ownerid: parseInt(id),
    model: model,
    color: color,
    purchase_date: purchasedate,
  };
  const ShowService = () => {
    setshowservice(!showservice);
    setcreateservice(false);
    setaddcars(false);
    setshowcars(false);
  };
  const Createservice = () => {
    setcreateservice(!createservice);
    setshowservice(false);
    setaddcars(false);
    setshowcars(false);
  };
  const showCars = () => {
    setshowcars(!showcars);
    setaddcars(false);
    setcreateservice(false);
    setshowservice(false);
  };
  const addcars = () => {
    setaddcars(!addcar);
    setshowcars(false);
    setcreateservice(false);
    setshowservice(false);
  };
  const servicef = (e) => {
    e.preventDefault();
    axios.post("https://apicars.prisms.in/servicing/create", Servicingrecord);
    window.alert("record added");
  };
  //   const getcardata = async () => {
  //     const cardata = await axios.get("https://apicars.prisms.in/car/get/3");
  //     setcars(cardata.Cars);
  //   };
  const useridauth = async (e) => {
    e.preventDefault();
    const userdata = await axios.get("https://apicars.prisms.in//user/getall");
    const userauth = userdata.data.Users.find(
      (user) => user.id === parseInt(id)
    );
    if (userauth === undefined) {
      setvalidation(true);
    } else {
      axios.post("https://apicars.prisms.in/car/create", form);
    }
  };
  return (
    <div className="userform">
      <h1>Car Management</h1>
      <div className="buttoncon">
        <button className="button" onClick={showCars}>
          Display All Serviced Cars
        </button>
        <button className="button" onClick={addcars}>
          Create new car record
        </button>
        <button className="button" onClick={Createservice}>
          Create Servicing record
        </button>
        <button className="button" onClick={ShowService}>
          Show Car List
        </button>
      </div>
      <Tabs>
        <TabList>
          {showcars && <Tab>Services List</Tab>}
          {addcar && <Tab>Add Record</Tab>}
          {createservice && <Tab>Add Service</Tab>}
          {showservice && <Tab>Show Car List</Tab>}
        </TabList>
        {showcars && (
          <TabPanel>
            <div className="tablee">
              <table>
                <thead>
                  <th>Id</th>
                  <th>Model</th>
                  <th>purchase-date</th>
                  <th>Servicing</th>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id}>
                      <td>{car.id}</td>
                      <td>{car.model}</td>
                      <td>{car.purchaseDate}</td>
                      <td>
                        <table>
                          <tbody>
                            {car.Servicing.map((service) => (
                              <tr key={service.id}>
                                <td>{service.servicing_date}</td>
                                <td>{service.status}</td>
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
            <form onSubmit={useridauth}>
              <label>Id</label>
              <input
                type="number"
                value={id}
                onChange={(event) => setid(event.target.value)}
              ></input>
              <label>model</label>
              <input
                value={model}
                type="text"
                onChange={(event) => setmodel(event.target.value)}
              ></input>
              <label>color</label>
              <input
                value={color}
                type="text"
                onChange={(event) => setcolor(event.target.value)}
              ></input>
              <lable>purchase-date</lable>
              <input
                value={purchasedate}
                type="date"
                onChange={(event) => setpurchasedate(event.target.value)}
              ></input>
              <button type="submit">Submit</button>
              {validation && <span className="validationmsg">First Add User</span>}
            </form>
          </div>
        )}
        {createservice && (
          <div className="userform1">
            <form onSubmit={servicef}>
              <label>Car-Id</label>
              <input
                type="number"
                value={carid}
                onChange={(event) => setcarid(event.target.value)}
              ></input>

              <label>status</label>
              <select
                value={status}
                type="text"
                onChange={(event) => setstatus(event.target.value)}
              >
                <option value="finished">finished</option>
                <option value="unfinished">unfinished</option>
                <option value="scheduled">scheduled</option>
              </select>
              <lable>servicing-date</lable>
              <input
                value={servicing_date}
                type="date"
                onChange={(event) => setservicing_date(event.target.value)}
              ></input>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {showservice && (
          <TabPanel>
            <div className="tablee">
              <table>
                <thead>
                  <th>Id</th>
                  <th>Model</th>
                  <th>purchase-date</th>
                  <th>Servicing</th>
                </thead>
                <tbody>
                  {cardatabase.map((cars) => (
                    <tr key={cars.id}>
                      <td>{cars.id}</td>
                      <td>{cars.model}</td>
                      <td>{cars.purchaseDate}</td>
                      <td>{cars.color}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
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
