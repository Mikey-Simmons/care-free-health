import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CoachHome = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments]= useState([]);
  

  const logout = () => {
    sessionStorage.clear();
    navigate("/coachlogin");
  };
   async function fetchAppData(){
    setLoading(true);
    await axios.get("http://localhost:8080/bookings").then((res)=>{
       return res.data; 
        
  }).then((resp)=>{
    setAppointments(resp);  
    console.log(appointments);
    setLoading(false);
  })
}

  useEffect(() => {
    let id = sessionStorage.getItem("id");
    let name = sessionStorage.getItem("name");
    if (id === "" || id === null) {
      navigate("/");
    } else {
      setId(id);
      setName(name);
      setLoading(true);
      async function fetchBookings(){
        const res =  await axios.get("http://localhost:8080/bookings");
        console.log(res.data);
        setAppointments(res.data);
        setLoading(false)
      }
      fetchBookings();
    }
  }, []);
  if(loading) return <h1>Loading</h1>;
  if(!appointments){
    return <h1>Loading...

    </h1>
  }

  
  else{
    return (
        <>
          <h1>Welcome {name} </h1>
            {appointments.map(({appointmentDate})=>(
                <h1>{appointmentDate}</h1>
            ))}
          <button onClick={logout}>Logout</button>
        </>
      );
  }
    

  }
   
  
 
  


export default CoachHome;
