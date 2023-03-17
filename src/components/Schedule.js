import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoachNavBar from "./CoachNavBar";
import Footer from "./Footer";
const Schedule = () => {
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
    let id = sessionStorage.getItem("coachid");
    let name = sessionStorage.getItem("name");
    if (id === "" || id === null) {
      navigate("/");
    } else {
      setId(id);
      setName(name);
      setLoading(true);
      async function fetchBookings() {
        const res = await axios.get("http://localhost:8080/bookings?coachId="+id);
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
      <CoachNavBar></CoachNavBar>
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
      </>
    );
  }
};

export default Schedule;
