import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "./UserNavBar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Appointment = () => {
  const [coachId, setCoachId] = useState("");
  const [userId, setUserId] = useState("");
  const [slot, setSlot] = useState("");
  const routeParams = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  
  useEffect(() => {
    let id = sessionStorage.getItem("id");
    let name = sessionStorage.getItem("name");
    if (id === "" || id === null) {
      navigate("/");
    } else {
      
      setUserId(id);
      
    }
  }, []);
  const validate =()=>{
    let result = true;
    if(slot===""){
      result = false;
      toast.warning("Please pick a time slot");

    }
    return result;
  }
  const bookAppointment= (e)=>{
    e.preventDefault();
    let newAppointment = {
    appointmentDate: appointmentDate,
      slot: slot,
      userId: userId,
      coachId: routeParams.id,
    }
    if(validate()){
      toast.success("Success", { position: toast.POSITION.TOP_CENTER });
      axios.post("http://localhost:8080/bookings", newAppointment).then(setSuccess("Success"));
    }
    
}
    if(success===""){

    
  return (
   <>
    <UserNavbar></UserNavbar>
    <div className="container-login">
    <ToastContainer />
      <form>
        <div className="form-group">
          
          <input type="hidden" value={routeParams.id} className="form-control"></input>
        </div>
        <div className="form-group">
          <label>
            Date of Appointment <span className="errmsg"></span>
          </label>
          <input
            type="date"
            onChange={(e) => {setAppointmentDate(e.target.value)}}
            className="form-control"
          ></input>
        </div>
        
        <div className="form-group">
          <label for="times">Choose a Time Slot:</label>

          <select onChange={(e)=>{setSlot(e.target.value)}} name="times" id="times">
          <option value="">          </option>
            <option value="9AM to 10AM">9AM to 10AM</option>
            <option value="10AM to 11AM">10AM to 11AM</option>
            <option value="11AM to 12PM">11AM to 12PM</option>
            <option value="12PM to 1PM">12PM to 1PM</option>
            <option value="1PM to 2PM">1PM to 2PM</option>
            <option value="2PM to 3PM">2PM to 3PM</option>
            <option value="4PM to 5PM">4PM to 5PM</option>
          </select>
          <button onClick={bookAppointment} type="button" class="btn btn-primary">
                      Book Appointment
                    </button>
        </div>
      </form>
    </div>
    <Footer></Footer>
    </>
  );
  }else{
    toast.success("Success", { position: toast.POSITION.TOP_CENTER });
        
    navigate("/userschedule");
    
   
    

  }

}
export default Appointment;
