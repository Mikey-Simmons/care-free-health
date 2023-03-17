import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Footer from "./Footer";
const CoachSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfbirth, setDateOfBirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [speciality, setSpeciality] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [genderMessage, setGenderMessage] = useState("");
  const [dateOfBirthMessage, setDateOfBirthMessage] = useState("");
  const [mobileNumberMessage, setMobileNumberMessage] = useState("");
  const [specialtyMessage, setSpecialtyMessage] = useState("");
  const [success, setSuccess] = useState("");
  var today = new Date(Date());
  const addCoach = (e) => {
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
    if(speciality.length <10 || speciality.length>50){
        setSpecialtyMessage("This field should be between 10 to 50 characters.");
    }


    else{

    

      let newCoach = {
        name: name,
        password: password,
        gender: gender,
        dateOfbirth: dateOfbirth,
        mobileNumber: mobileNumber,
        speciality: speciality,
      };
      if(nameMessage===""&& passwordMessage===""&&genderMessage===""&&dateOfBirthMessage===""&&mobileNumberMessage===""&&specialtyMessage===""){

      
      axios.post("http://localhost:8080/coaches", newCoach).then((res) => {
        setSuccess(`New Coach has been added with the id ${res.data.id}`);

      });
      setName("");
      setPassword("");
      setGender("");
      setDateOfBirth("");
      setMobileNumber("");
      setSpeciality("");
    }
}
}
  if(success===""){

  
  return (
    <>
      <h1>Coach Signup</h1>
      
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
        Speciality: <input type="text" value={speciality} onChange={(e) => {setSpeciality(e.target.value);setSpecialtyMessage("")}}/><br></br>
        <div className="text-danger">{specialtyMessage}</div>
        <button onClick={addCoach} className="btn btn-primary">Add</button><br></br>
          
      </form>
      <Footer></Footer>
    </>
  
  );
  }
  
  else{
    return(<>
    <h1>You are a coach now!</h1>
    <Link to="coachlogin" class="btn btn-primary">Login</Link>
    <Footer></Footer>
    </>
    )
  }
}
export default CoachSignup;
