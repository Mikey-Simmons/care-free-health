import React from "react";
import NavBar from "./NavBar"
import Footer from "./Footer"
import { Link } from "react-router-dom";
function Home(){
    return(
        <>
        <NavBar></NavBar>
        <div className="container">
        <h1 className="home">Unlock your full potential and become your best self!</h1>
        <div className="card-container">
        <div class="card2" >
  
  <div class="card-body2">
    <Link to="userlogin" class="btn btn-primary">Login as a User </Link>
    
    <Link to="usersignup" class="btn btn-primary">Join as a User </Link>
  </div>
</div>
<div class="card2" >
  
  <div class="card-body2">
    
    <Link to="coachlogin" class="btn btn-primary">Login as a Coach</Link>
    
    <Link to="coachsignup" class="btn btn-primary">Join as a Coach</Link>
  </div>
</div>
</div>
        </div>
        <Footer></Footer>
        </>
    )
}
export default Home;