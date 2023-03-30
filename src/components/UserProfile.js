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
        <img class="card-img-top"alt="" src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg" />
        <div class="card-body">
          
        
          <h5 class="card-title">{name}'s Profile</h5>
          
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{city}, {state}, {zipcode},  {country}  </li>
          <li class="list-group-item"> {mobileNumber}</li>
          <li class="list-group-item"> {email}</li>
          <li class="list-group-item">{dateOfBirth}</li>
        </ul>
        
      </div>
      </div>
        <Footer></Footer>
      </>
    );
  }
};

export default UserProfile;
