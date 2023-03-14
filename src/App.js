import "./App.css";
import React from "react";

import Home from "./components/Home";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import CoachSignUp from "./components/CoachSignup";
function App() {;
  return (
    <BrowserRouter>
    <Routes>
    <Route path = "/" element={<Home/>}/>
      <Route path = "/coachsignup" element={<CoachSignUp/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
