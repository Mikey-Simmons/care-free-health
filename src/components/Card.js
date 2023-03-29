import React from 'react';
import { useNavigate, } from "react-router-dom";
const Card =({name, mobileNumber, speciality, id, email})=>{
    const navigate = useNavigate();
    return(
<div class="container-fluid px-1 py-5 mx-auto">
    <div class="row d-flex justify-content-center">
        <div class="card">
        <div class="row d-flex justify-content-between mx-2 px-3 card-strip">
                <div class="left d-flex flex-column">
                
                    <h5 class="mb-1">Coach {name} </h5>
                    <div className="right">
                      
                    <img alt="" src="https://previews.123rf.com/images/wannawit/wannawit2001/wannawit200100012/137138620-doctor-medical-cartoon-design-vector.jpg"/>
                      </div>
                      
                </div>
                
            </div>
            <div class="row d-flex justify-content-between mx-2 px-3 card-strip">
                <div class="left d-flex flex-column">
                  
                    <h5 class="mb-1">Speciality</h5>
                    <p class="text mb-1 sm-text">{speciality}</p>
                    
                </div>
                
                
            </div>
            <div class="row d-flex justify-content-between mx-2 px-3 card-strip">
                <div class="left d-flex flex-column">
                  
                    <h5 class="mb-1">Contact</h5>
                    <p class="text mb-1 sm-text">{mobileNumber}</p>
                    <p class="text mb-1 sm-text">{email}</p>
                    
                </div>
                
                
            </div>
            
            <div class="row d-flex justify-content-between mx-2 px-3">
                
                <button onClick={()=>navigate(`/book/${id}`)}   className="btn btn-purple">Book Me!</button>
            </div>
        </div>
        
    </div>
</div>
    )
}
export default Card;