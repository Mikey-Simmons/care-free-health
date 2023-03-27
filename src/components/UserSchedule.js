import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavBar from "./UserNavBar";
import Footer from "./Footer";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const UserSchedule = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [update, setUpdate] = useState(false);
  const [appToBeUpdated, setAppToBeUpdated] = useState({appointmentDate: "",
  id: 0,
  slot: "",
  userId: 0,
  coachId: 0})

  const logout = () => {
    sessionStorage.clear();
    navigate("/coachlogin");
  };
  const  cancelAppointment = (appointmentToBeDeleted) => {
      
      axios.delete("http://localhost:8080/bookings/" + appointmentToBeDeleted).then((res)=>{
        axios.get("http://localhost:8080/bookings/").then((res)=>{
          setAppointments(res.data);
        })
      })
      
    
  };
  
  
  const areYouSure =(appId)=>{
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to cancel the appointment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => cancelAppointment(appId)
        },
        {
          label: 'No',
          
        }
      ]
    });
  }
  useEffect(() => {
    let id = sessionStorage.getItem("id");
    let name = sessionStorage.getItem("name");
    if (id === "" || id === null) {
      console.log(id);
      navigate("/");
    } else {
      setId(id);
      setName(name);
      setLoading(true);
       
        axios.get(
          "http://localhost:8080/bookings?userId=" + id
        ).then((response)=> {setAppointments(response.data)})
        .catch((error)=> {console.log(error)});
        setLoading(false);
        async function fetchCoaches() {
          const res = await axios.get("http://localhost:8080/coaches");
          
          setCoaches(res.data);
        }
        fetchCoaches();
        
      
    
    }
  }, [])
  const findCoachName =(id)=>{
    if(coaches[id]=== undefined) {return null}
    
    else{
      return coaches[id].name ;
    }
    

  } 
  
  const findBooking =(id)=>{
    let book = appointments.find(
      function(el){
        return el.id=== id
      }
    )
    console.log(book)
    setUpdate(true);
    setAppToBeUpdated(book);
    
  }
  const updateBooking = (e)=>{
    
    e.preventDefault();
    console.log(appToBeUpdated.id)
    axios.put("http://localhost:8080/bookings/"+ appToBeUpdated.id, appToBeUpdated).then((response)=>{
      let index = appointments.findIndex((appointment) => appointment.id === appToBeUpdated.id)
    let temp = [...appointments];
    temp[index] = response.data  ;
    setAppointments(temp)

      
      setUpdate(false);
    })
  
  }
  
  if (loading) return <h1>Loading</h1>;
  
  if (!appointments) {
    return <h1>Loading...</h1>;
  } 
  else {
    return (
      <>
        <UserNavBar></UserNavBar>
        <div className="container2">
          <h1 className="userhome">Welcome {name} </h1>
        </div>
        <div className="container2">
          {appointments.map(
            ({ appointmentDate, slot, userId, coachId, id }) => (
              <div class="card">
                <div class="card-body">
                <h5 class="card-title">
                  
                  Appointment Date: {appointmentDate}
                </h5>
                <p className="card-text">
                Coach: {findCoachName(coachId)}
                </p>
                  
                  <p className="card-text">Time Slot: {slot}</p>
                  
                  <button className="btn btn-danger" onClick={()=>areYouSure(id)} >
                    Cancel Appointment
                  </button>
                  <button className="btn btn-success" onClick={()=>{findBooking(id)}}  >
                    Reschedule Appointment
                  </button>
                  
                </div>
              </div>
            )
          )}
          {update ? 
          <form>
          <div className="form-group">
          <input type="hidden" value={appToBeUpdated.userId} className="form-control"></input>
          <input type="hidden" value={appToBeUpdated.coachId} className="form-control"></input>
        </div>
          <div className="form-group">
            <label>
              Date of Appointment <span className="errmsg"></span>
            </label>R
            <input
              type="date"

              onChange={(e) => {setAppToBeUpdated({...appToBeUpdated, appointmentDate: e.target.value})}}
              className="form-control"
              value={appToBeUpdated.appointmentDate}
            ></input>
          </div>
          
          <div className="form-group">
            <label for="times">Choose a Time Slot:</label>
            <br></br>
            <select onChange={(e)=>{setAppToBeUpdated({...appToBeUpdated, slot: e.target.value})}} value={appToBeUpdated.slot} name="times" id="times">
            <option value="">          </option>
              <option value="9AM to 10AM">9AM to 10AM</option>
              <option value="10AM to 11AM">10AM to 11AM</option>
              <option value="11AM to 12PM">11AM to 12PM</option>
              <option value="12PM to 1PM">12PM to 1PM</option>
              <option value="1PM to 2PM">1PM to 2PM</option>
              <option value="2PM to 3PM">2PM to 3PM</option>
              <option value="4PM to 5PM">4PM to 5PM</option>
            </select>
            <br></br>
            <br></br>
            <button onClick={(e)=>{updateBooking(e)}} type="button" class="btn btn-primary">
                        Update
                      </button>
          </div>
        </form>
        :null
  }
        
          <Footer></Footer>
        </div>
      </>
    );
  }
};

export default UserSchedule;
