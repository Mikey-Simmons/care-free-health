import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavBar from "./UserNavBar";
import Footer from "./Footer";
const UserProfile = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);

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
        const res = await axios.get("http://localhost:8080/users/" + id);

        setDateOfBirth(res.data.dateOfBirth);
        setMobileNumber(res.data.mobileNumber);
        setZipcode(res.data.zipcode);
        setCountry(res.data.country);
        setCity(res.data.city);
        setState(res.data.state);
        setEmail(res.data.email);
        setLoading(false);
        
      }
      fetchCoach();
    }
  }, []);
  if (loading) return <h1>Loading</h1>;
  else {
    return (
      <>
        <UserNavBar></UserNavBar>
<div className="container2">
        <div class="card">
          <div class="card-body">
          <img  src="https://png.pngitem.com/pimgs/s/42-423085_clip-art-person-clip-art-black-man-symbol.png" className="card-img" alt="..."/>
            <h3 class="card-title"> {name}</h3>
            <h5 class="card-title">User Id: {id}</h5>

            <h5 class="card-title">Date of Birth: {dateOfBirth} </h5>
            <h5 class="card-title">Email: {email} </h5>
            <h5 class="card-title">Mobile Number: {mobileNumber} </h5>
            <h5 class="card-title">Address: {city}, {state}, {zipcode},  {country} </h5>
            
            <p class="card-text"></p>
          </div>
        </div>

        </div>
        <Footer></Footer>
      </>
    );
  }
};

export default UserProfile;
