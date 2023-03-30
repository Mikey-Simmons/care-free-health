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
  const months = ["blank","January", "February","March", "April", "May","June","July","August","September","October", "November", "December"]
  const [appToBeUpdated, setAppToBeUpdated] = useState({appointmentDate: "",
  id: 0,
  slot: "",
  userId: 0,
  coachId: 0})
  const dateParse=(date)=>{
    var myArray = date.split('-');
    var myNum = parseInt(myArray[1]);
    return months[myNum]+" "+myArray[2]+", " +myArray[0];
  }
  const isMale = (gender)=>{
    if(gender ==="M"|| gender==="Male"){
      
      return "https://previews.123rf.com/images/wannawit/wannawit2001/wannawit200100012/137138620-doctor-medical-cartoon-design-vector.jpg"
    }if(gender==="F"){
      return "https://img.freepik.com/premium-vector/beautiful-female-doctor-with-medical-set-hand-drawn-cartoon-character_429315-415.jpg?w=360"
    }
    
  }
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
  const findCoachName =(coachId)=>{
    
    
    for(var i =0; i<coaches.length; i++){
      if(coaches[i].id==coachId){
        
        return coaches[i].name;
      }
      
      
    }
  }
  const findCoachGender =(coachId)=>{
    
    
    for(var i =0; i<coaches.length; i++){
      if(coaches[i].id==coachId){
        
        return coaches[i].gender;
      }
      
      
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
          
          <h1 className="userhome">{name}'s Upcoming Appointments </h1>
          
        </div>
        
        {update ? 
          <form>
          <div className="container2 px-1 py-5 mx-auto">
          
              <div class="container-fluid px-1 py-5 mx-auto">
    <div class="row d-flex justify-content-center">
        <div class="card">
        <div class="row d-flex justify-content-between mx-2 px-3 card-strip">
                <div class="left d-flex flex-column">
                
                    <h5 class="mb-1">Reschedule Appointment with {findCoachName(appToBeUpdated.coachId)}  </h5>
                    <div className="right">
                    <img alt="" src={isMale(findCoachGender(appToBeUpdated.coachId))}/>
                      </div>

                </div>
                <input
              type="date"

              onChange={(e) => {setAppToBeUpdated({...appToBeUpdated, appointmentDate: e.target.value})}}
              className="form-control"
              value={appToBeUpdated.appointmentDate}
            ></input>
            </div>
            <div class="row d-flex justify-content-between mx-2 px-3 card-strip">
                <div class="left d-flex flex-column">
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
                    
                    <p class="text-muted mb-1 sm-text">{}</p>
                    
                </div>
                
            </div>
            
            
            <div class="row d-flex justify-content-between mx-2 px-3">
                <button onClick={()=>setUpdate(false)} class="btn btn-white">Go Back</button>
                <button onClick={(e)=>{updateBooking(e)}} class="btn btn-purple">Reschedule</button>
            </div>
        </div>
    </div>
</div>
          </div>
        </form>
        :null
  }
        
        <div className="container2 px-1 py-5 mx-auto">
          {appointments.map(
            ({ appointmentDate, slot, userId, coachId, id, }) => (
              
              <div class="container-fluid px-1 py-5 mx-auto">
    <div class="row d-flex justify-content-center">
        <div class="card">
        <div class="row d-flex justify-content-between mx-2 px-3 card-strip">
                <div class="left d-flex flex-column">
                
                    <h5 class="mb-1">Appointment with Coach {findCoachName(coachId)} </h5>
                    <div className="right">
                    <img alt="" src={isMale(findCoachGender(coachId))}/>
                      </div>
                </div>
                
            </div>
            <div class="row d-flex justify-content-between mx-2 px-3 card-strip">
                <div class="left d-flex flex-column">
                  
                    <h5 class="mb-1">{slot}</h5>
                    <p class="text-muted mb-1 sm-text">{dateParse(appointmentDate)}</p>
                    
                </div>
                
            </div>
            
            
            <div class="row d-flex justify-content-between mx-2 px-3">
                <button onClick={()=>areYouSure(id)} className="btn btn-white">Cancel</button>
                <button onClick={()=>{findBooking(id)}}  className="btn btn-purple">Reschedule</button>
            </div>
        </div>
    </div>
</div>
              
            )
          )}
          
        
          <Footer></Footer>
        </div>
      </>
    );
  }
};

export default UserSchedule;
