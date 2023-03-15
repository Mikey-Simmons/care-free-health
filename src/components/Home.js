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
        <div class="card" >
  <img src="https://png.pngitem.com/pimgs/s/42-423085_clip-art-person-clip-art-black-man-symbol.png" class="card-img-top" alt="..."/>
  <div class="card-body">
    <a href="/" class="btn btn-primary">Login as a User </a>
    
    <a href="/" class="btn btn-primary">Join as a User </a>
  </div>
</div>
<div class="card" >
  <img  src="https://png.pngitem.com/pimgs/s/72-721152_transparent-coach-clipart-coach-png-png-download.png" class="card-img-top" alt="..."/>
  <div class="card-body">
    
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