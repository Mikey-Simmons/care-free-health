import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoachNavBar from "./CoachNavBar";
import Footer from "./Footer";
const CoachProfile = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coach, setCoach] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [gender, setGender] = useState(null);
  const logout = () => {
    sessionStorage.clear();
    navigate("/coachlogin");
  };
          
          
  const isMale = (gender)=>{
    if(gender ==="M"|| gender==="Male"){
      
      return "https://previews.123rf.com/images/wannawit/wannawit2001/wannawit200100012/137138620-doctor-medical-cartoon-design-vector.jpg"
    }if(gender==="F"){
      return "https://img.freepik.com/premium-vector/beautiful-female-doctor-with-medical-set-hand-drawn-cartoon-character_429315-415.jpg?w=360"
    }
    
  }
  useEffect(() => {
    let id = sessionStorage.getItem("coachid");
    let name = sessionStorage.getItem("name");
    if (id === "" || id === null) {
      navigate("/");
    } else {
      setId(id);
      setName(name);
      async function fetchCoach() {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/coaches/" + id);

        setDateOfBirth(res.data.dateOfBirth);
        setMobileNumber(res.data.mobileNumber);
        setSpecialty(res.data.speciality);
        setGender(res.data.gender)
        setLoading(false);
      }
      fetchCoach();
    }
  }, []);
  if (loading) return <h1>Loading</h1>;
  else {
    return (
      <>
        <CoachNavBar></CoachNavBar>
      <div className="container2">
        <div class="card">
          <div class="card-body">
          <img class="card-img-top"alt="" src={isMale(gender)} />
            <h3 class="card-title"> {name}'s Profile</h3>
            <ul class="list-group list-group-flush">
              <li className="list-group-item">Coach Id: {id}</li>
              <li className="list-group-item">DOB: {dateOfBirth}</li>
            <li className="list-group-item">Speciality: {specialty}</li>
            </ul>
            <p class="card-text"></p>
          </div>
        </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
};

export default CoachProfile;
