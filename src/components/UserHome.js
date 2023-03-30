import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserNavBar from "./UserNavBar";
import SearchBox from "./SearchBox";
import Footer from "./Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Scroll from "./Scroll";
import Card from "./Card";
import CardList from "./CardList";
const UserHome = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [coachId, setCoachId] = useState("");
  const [userId, setUserId] = useState("");
  const [searchfield, setSearchfield] = useState("");
  const [slot, setSlot]= useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  
  const logout = () => {
    sessionStorage.clear();
    navigate("/userlogin");
  };
  
  useEffect(() => {
    let id = sessionStorage.getItem("id");
    let name = sessionStorage.getItem("name");
    if (id === "" || id === null) {
      navigate("/");
    } else {
      setId(id);
      setName(name);
      setUserId(id);
      async function fetchCoaches() {
        const res = await axios.get("http://localhost:8080/coaches");
        console.log(res.data);
        setCoaches(res.data);
      }
      fetchCoaches();
      
     
    }
  }, []);
  const onSearchChange = (event) => {
    event.preventDefault();
    setSearchfield(event.target.value);
  };
  const filteredCoaches = coaches.filter((coach) => {
    return coach.speciality.toLowerCase().includes(searchfield.toLowerCase());
    
  });
  
  const bookAppointment= (e)=>{
    e.preventDefault();
    let newAppointment = {
    appointmentDate: appointmentDate,
      slot: slot,
      userId: userId,
      coachId: coachId,
    }
  }
  
    
      
    return (
      <>
      <div className="cards">
        <UserNavBar></UserNavBar>
        
        <div className="container2">
        <h1 className="userhome">Welcome {name}! </h1>
        </div>
        
        <div className="container">
        <SearchBox searchChange={onSearchChange}></SearchBox>
        
        </div>
        
        
               
            
        
        
        
    /
        <CardList coaches={filteredCoaches}></CardList>
        
        
            
          
          
     
   
        <Footer></Footer>
        </div>
      </>
    );
  
  
};
export default UserHome;
