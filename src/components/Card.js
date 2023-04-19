import React, { useState } from 'react';
import { useNavigate, } from "react-router-dom";
const Card =({name, mobileNumber, speciality, id, email, gender })=>{
    const navigate = useNavigate();
    const isMale = (gender)=>{
      if(gender ==="M"|| gender==="Male"){
        
        return "https://previews.123rf.com/images/wannawit/wannawit2001/wannawit200100012/137138620-doctor-medical-cartoon-design-vector.jpg"
      }if(gender==="F"){
        return "https://img.freepik.com/premium-vector/beautiful-female-doctor-with-medical-set-hand-drawn-cartoon-character_429315-415.jpg?w=360"
      }
      
    }
    return (
        
        <div class="card">
        
        <div class="card-body">
          
        <img class="card-img-top"alt="" src={isMale(gender)} />
          <h5 class="card-title">Coach {name} </h5>
          
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Speciality: {speciality}</li>
          <li class="list-group-item">Phone Number: {mobileNumber}</li>
        </ul>
        <div class="card-body">
        <button onClick={()=>navigate(`/book/${id}`)}   className="btn btn-purple">Book Me!</button>
        </div>
      </div>
      
    )
}
export default Card;