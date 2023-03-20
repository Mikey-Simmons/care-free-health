import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavBar from "./UserNavBar";
import Footer from "./Footer";
const UserSchedule = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const logout = () => {
    sessionStorage.clear();
    navigate("/coachlogin");
  };
  

  useEffect(() => {
    let id = sessionStorage.getItem("id");
    let name = sessionStorage.getItem("name");
    if (id === "" || id === null) {
        console.log(id)
      navigate("/");}
    else {
      setId(id);
      setName(name);
      setLoading(true);
      async function fetchBookings() {
        const res = await axios.get("http://localhost:8080/bookings?userId="+id);
        console.log(res.data);
        setAppointments(res.data);
        setLoading(false);
      }
      fetchBookings();
    }
  }, []);
  if (loading) return <h1>Loading</h1>;
  if (!appointments) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>


      <UserNavBar></UserNavBar>
      <div className="container2">
        <h1>Welcome {name} </h1>

        {appointments.map(({ appointmentDate, slot, userId, coachId, id }) => (
          
          <div class="card">
            <div class="card-body">
                
              <h5 class="card-title">Appointment: {id}</h5>
              <h5 class="card-title">Appointment Date: {appointmentDate}</h5>
              <h5 class="card-title">Time Slot: {slot}</h5>
              <p class="card-text">
                UserId: {userId} CoachId: {coachId}
              </p>
            </div>
          </div>
        ))}

        <Footer></Footer>
        </div>
      </>
    );
  }
};

export default UserSchedule;
