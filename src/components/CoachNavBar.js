import { useNavigate } from "react-router-dom";
import React from "react";

function CoachNavBar() {
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.clear();
        navigate("/coachlogin");
      };
  return (
    <>
      <nav class="navbar bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            CareFreeHealth
          </a>
          <li className="navbar nav-item">
            <a className="contact" href="/coachschedule">
              My Schedule
            </a>
          </li>
          <li className="navbar nav-item">
            <a className="contact" href="/coachprofile">
              View Profile
            </a>
          </li>
          <li className="navbar nav-item">
            <a className="contact" href="/contact">
              Contact Us!
            </a>
          </li>
          <li className="navbar nav-item">
            <a href="/coachlogin" className="contact" onClick={logout}>
              Logout
            </a>
          </li>
        </div>
      </nav>
    </>
  );
}
export default CoachNavBar;