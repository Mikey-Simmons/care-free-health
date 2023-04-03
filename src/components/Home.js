import React  from "react";
import NavBar from "./NavBar"
import Footer from "./Footer"
import { Link, useNavigate, Navigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import logo from "../logocf.png";
const Home =()=>{
  const navigate = useNavigate();
  function navUserLogin(){
    navigate("/userlogin")
  }
  function navCoachLogin(){
    navigate("/coachlogin")
  }
  function navUserLogin(){
    navigate("/userlogin")
  }
  function navCoachLogin(){
    navigate("/coachlogin")
  }
  const AreYouSure =()=>{
    confirmAlert({
      title: 'Login',
      message: 'Login as User or Coach',
      buttons: [
        {
          label: 'User',
          onClick: () => navigate("/userlogin")
        },
        {
          label: 'Coach',
          onClick: () => navigate("/coachlogin")
          
        }
      ]
    });
  }
  const AreYouSureSignUp =()=>{
    confirmAlert({
      title: 'Sign up',
      message: 'Sign up as a new User or a new Coach',
      buttons: [
        {
          label: 'User',
          onClick: () => navigate("/usersignup")
        },
        {
          label: 'Coach',
          onClick: () => navigate("/coachsignup")
          
        }
      ]
    });
  }

    return(
        <>
        <NavBar></NavBar>
  
        <div className="container">
        <div className="container2">
          
          <h1 className="userhome">Welcome to CareFreeHealth! </h1>
          
        </div>
        <div className="container2">
          
          <h2 className="userhome">Unlock your full potential and meet with one of our coaches! </h2>
          
        </div>
          <div className="container2">
          
          </div>
        
        <div className="card-container">
        <div class="card2" >
  
  <div class="card-body2">
    <button onClick={AreYouSure} className="btn btn-primary">Login</button>
    
    <button onClick={AreYouSureSignUp}className="btn btn-primary">Sign up</button>
  </div>
</div>

  </div>
</div>

        
        <Footer></Footer>
        </>
    )
}
export default Home;