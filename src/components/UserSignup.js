import React, { useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
const UserSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfbirth, setDateOfBirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry]= useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [genderMessage, setGenderMessage] = useState("");
  const [dateOfBirthMessage, setDateOfBirthMessage] = useState("");
  const [mobileNumberMessage, setMobileNumberMessage] = useState("");
  const [zipcodeMessage, setZipcodeMessage] = useState("");
  const [cityMessage, setCityMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("")
  const [stateMessage, setStateMessage] = useState("");
  const [countryMessage, setCountryMessage] = useState("");
  const [success, setSuccess] = useState("");

  var today = new Date(Date());
  const addUser = (e) => {
    e.preventDefault();
    setSuccess("");
    if(name.length<3 || name.length>50){
        setNameMessage("Name should have 3 to 50 characters");
    }
    if(password.length<5||password.length>10){
        setPasswordMessage("Password should have 5 to 10 characters")
    }
    let myDate = new Date(dateOfbirth);

    if(today.getFullYear()- myDate.getFullYear()-1 <20){
        setDateOfBirthMessage("You must be at least 20 years old to sign up.");
    }
    if(gender===""){
        setGenderMessage("Gender is required")
    }
    if(mobileNumber.length!== 10 ){
        setMobileNumberMessage("Mobile numnber should be exactly 10 digits");
    }
    if(city.length<6|| city.length >50){
        setCityMessage("City value must be between 6 to 50 characters.");
    }
    if(zipcode.length!==5){
        setZipcodeMessage("Zipcode must be exactly 5 digits ");
    }
    if(state.length<6|| state.length >50){
        setStateMessage("State value must be between 6 to 50 characters.");
    }
    if(country.length<6|| country.length >50){
        setCityMessage("Country value must be between 6 to 50 characters.");
    }
    if(email ===""){
        setEmailMessage("Email is required");
    }

    else{

    

      let newUser = {
        name: name,
        password: password,
        gender: gender,
        email: email,
        dateOfbirth: dateOfbirth,
        mobileNumber: mobileNumber,
        zipcode: zipcode,
        state: state,
        city: city,
        country: country,
      };
      if(nameMessage===""&& passwordMessage===""&&genderMessage===""&&dateOfBirthMessage===""&&mobileNumberMessage===""&&emailMessage===""&&zipcodeMessage===""&&cityMessage===""&&stateMessage===""&&countryMessage===""){

      
      axios.post("http://localhost:8080/users", newUser).then((res) => {
        setSuccess(`Sign up complete!  Your new user id is:  ${res.data.id}`);

      });
      setName("");
      setPassword("");
      setGender("");
      setDateOfBirth("");
      setMobileNumber("");
      setEmail("");
      setCity("");
      setCountry("");
      setZipcode("");
      setState("");
    }
}
}
  if(success===""){

  
  return (
    <>
      <h1>User Signup</h1>
      
      <form>
        Name: <input type="text" value={name} onChange={(e) => {setName(e.target.value);setNameMessage("")}}/> <br></br>
        <div className="text-danger">{nameMessage}</div>
        Password: <input type="text" value={password} onChange={(e) => {setPassword(e.target.value);setPasswordMessage("")}}/><br></br>
        <div className="text-danger">{passwordMessage}</div>
        Gender: <input type="text" value={gender} onChange={(e) => {setGender(e.target.value);setGenderMessage("")}}/><br></br>
        <div className="text-danger">{genderMessage}</div>
        Date Of Birth: <input type="date" value={dateOfbirth} onChange={(e) => {setDateOfBirth(e.target.value);setDateOfBirthMessage("")}}/><br></br>
        <div className="text-danger">{dateOfBirthMessage}</div>
        Mobile Number: <input type="text" value={mobileNumber} onChange={(e) => {setMobileNumber(e.target.value);setMobileNumberMessage("")}}/><br></br>
        <div className="text-danger">{mobileNumberMessage}</div>
        Email: <input type="text" value={email} onChange={(e) => {setEmail(e.target.value);setEmailMessage("")}}/><br></br>
        <div className="text-danger">{mobileNumberMessage}</div>
        Zipcode: <input type="text" value={zipcode} onChange={(e) => {setZipcode(e.target.value);setZipcodeMessage("")}}/><br></br>
        <div className="text-danger">{zipcodeMessage}</div>
        City: <input type="text" value={city} onChange={(e) => {setCity(e.target.value);setCityMessage("")}}/><br></br>
        <div className="text-danger">{cityMessage}</div>
        State: <input type="text" value={state} onChange={(e) => {setState(e.target.value);setStateMessage("")}}/><br></br>
        <div className="text-danger">{stateMessage}</div>
        Country: <input type="text" value={country} onChange={(e) => {setCountry(e.target.value);setCountryMessage("")}}/><br></br>
        <div className="text-danger">{countryMessage}</div>
        <button onClick={addUser} className="btn btn-primary">Add</button><br></br>
          
      </form>
    </>
  
  );
  }
  
  else{
    return(<>
    <h1>{success}</h1>
    <Link to="userlogin" class="btn btn-primary">Login</Link>
    </>)
  }
}
export default UserSignup;
