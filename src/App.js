import "./App.css";
import React from "react";

import Home from "./components/Home";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import CoachSignUp from "./components/CoachSignup";
import CoachLogin from "./components/CoachLogin";
import CoachHome from "./components/CoachHome";
function App() {;
  return (
    <BrowserRouter>
    <Routes>
    <Route path = "/" element={<Home/>}/>
    <Route path = "/coachsignup" element={<CoachSignUp/>}/>
    <Route path = "/coachlogin" element={<CoachLogin/>}/>
    <Route path = "/coach/home" element={<CoachHome/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
