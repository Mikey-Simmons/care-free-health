import "./App.css";
import React from "react";

import Home from "./components/Home";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import CoachSignUp from "./components/CoachSignup";
import CoachLogin from "./components/CoachLogin";
import CoachHome from "./components/CoachHome";
import UserHome from "./components/UserHome";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import CoachProfile from "./components/CoachProfile";
import UserProfile from "./components/UserProfile";
import Schedule from "./components/Schedule";
import Appointment from "./components/Appointment"
import UserSchedule from "./components/UserSchedule";
function App() {;
  return (
    <BrowserRouter>
    <Routes>
    <Route path = "/" element={<Home/>}/>
    <Route path="/book/:id" element={<Appointment/>}></Route>
    <Route path = "/coachsignup" element={<CoachSignUp/>}/>
    <Route path = "/coachlogin" element={<CoachLogin/>}/>
    <Route path = "/coach/home" element={<CoachHome/>}/>
    <Route path = "/usersignup" element={<UserSignup/>}/>
    <Route path = "/userlogin" element={<UserLogin/>}/>
    <Route path = "/user/home" element={<UserHome/>}/>
    <Route path = "/userprofile" element={<UserProfile/>}/>
    <Route path = "/coachprofile" element={<CoachProfile/>}/>
    <Route path = "/coachschedule" element={<Schedule/>}/>
    <Route path = "/userschedule" element={<UserSchedule/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
