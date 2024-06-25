import React, { useState } from "react";
import { Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import cardata from "./cardata.json";
import cardata1 from "./cardata1.json";

function Carmanagement() {
  const cars = cardata.Cars;
  const cardatabase = cardata1.Cars;
  const [addcar, setaddcars] = useState(false);
  const [showcars, setshowcars] = useState(false);
  const [showservice, setshowservice] = useState(true);
  const [createservice, setcreateservice] = useState(false);
  const [model, setmodel] = useState("");
  const [id, setid] = useState("");
  const [color, setcolor] = useState("");
  const [purchasedate, setpurchasedate] = useState("");
  const [carid, setcarid] = useState("");
  const [servicing_date, setservicing_date] = useState("");
  const [status, setstatus] = useState("");
  const [validation, setvalidation] = useState(false);
  const [validate, setvalidate] = useState(false);
  const [validateaddcar,setvalidateaddcar]=useState(false);
  const [usersuccess,setusersuccess]=useState(false);
  const Servicingrecord = {
    id: parseInt(carid),
    servicing_date: servicing_date,
    status: status,
  };

  const form = {
    ownerid: id,
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
    if (servicing_date !== "" && status!=="" && carid!==undefined) {
      axios.post("https://apicars.prisms.in/servicing/create", Servicingrecord);
      console.log(Servicingrecord);
    } else {
      setvalidate(true);

    }
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
      setvalidateaddcar(false);

    } else if(id!==undefined && model!=="" &&color!==""&& purchasedate!=="" ) {
      axios.post("https://apicars.prisms.in/car/create", form);
      setusersuccess(true);
      setvalidation(false);
      setvalidateaddcar(false);


      
    }else{
      setvalidateaddcar(true);
      setvalidation(false);
    }
  };
  return (
    <div className="userform">
      <h1>Car Management</h1>
      <div className="buttoncon">
        <button className="button" onClick={ShowService}>
          Show Car List
        </button>
        <button className="button" onClick={showCars}>
          Display All Serviced Cars
        </button>
        <button className="button" onClick={addcars}>
          Create new car record
        </button>
        <button className="button" onClick={Createservice}>
          Create Servicing record
        </button>
      </div>
      <Tabs>
        <TabList>
          {/* {showcars && <Tab>Services List</Tab>}
          {addcar && <Tab>Add Record</Tab>}
          {createservice && <Tab>Add Service</Tab>} */}
          {/* {showservice && <Tab>Show Car List</Tab>} */}
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
              {validation && (
                <span className="validatemsg">First Add User</span>
              )}
              {validateaddcar&&(<span className="validatemsg">Fields cannot be empty</span>)}
              {usersuccess&&(<span className="validatemsg">User Succesfully Registered</span>)}
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
                <option>Select Option</option>
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
              {validate&&(<span className="validatemsg">Field cannot be empty</span>)}
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
    </div>
  );
}

export default Carmanagement;
