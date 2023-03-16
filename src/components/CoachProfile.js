import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoachNavBar from "./CoachNavBar";
const CoachHome = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coach, setCoach] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const logout = () => {
    sessionStorage.clear();
    navigate("/coachlogin");
  };

  useEffect(() => {
    let id = sessionStorage.getItem("id");
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

        <div class="card">
          <div class="card-body">
          <img  src="https://png.pngitem.com/pimgs/s/72-721152_transparent-coach-clipart-coach-png-png-download.png" class="card-img-top" alt="..."/>
            <h3 class="card-title"> {name}</h3>
            <h5 class="card-title">Coach Id: {id}</h5>

            <h5 class="card-title">Date of Birth: {dateOfBirth} </h5>
            <h5 class="card-title">Specialty: {specialty} </h5>
            <p class="card-text"></p>
          </div>
        </div>

        
      </>
    );
  }
};

export default CoachHome;
