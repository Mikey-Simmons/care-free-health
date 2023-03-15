import "./App.css";
import React from "react";

import Home from "./components/Home";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import CoachSignUp from "./components/CoachSignup";
import CoachLogin from "./components/CoachLogin";
function App() {;
  return (
    <BrowserRouter>
    <Routes>
    <Route path = "/" element={<Home/>}/>
    <Route path = "/coachsignup" element={<CoachSignUp/>}/>
    <Route path = "/coachlogin" element={<CoachLogin/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
