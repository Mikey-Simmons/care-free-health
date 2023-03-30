import React from 'react';
import { useNavigate, } from "react-router-dom";
const Card =({name, mobileNumber, speciality, id, email})=>{
    const navigate = useNavigate();
    return(
        
        <div class="card">
        
        <div class="card-body">
        <img class="card-img-top"alt="" src="https://previews.123rf.com/images/wannawit/wannawit2001/wannawit200100012/137138620-doctor-medical-cartoon-design-vector.jpg" alt="Card image cap"/>
          <h5 class="card-title">Coach {name}</h5>
          
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