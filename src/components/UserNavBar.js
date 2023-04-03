import { useNavigate } from "react-router-dom";
import React from "react";

function UserNavBar() {
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.clear();
        navigate("/coachlogin");
      };
  return (
    <>
      <nav class="navbar bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/user/home">
            CareFreeHealth
          </a>
          <li className="navbar nav-item">
            <a className="contact" href="/userschedule">
              My Appointments
            </a>
          </li>
          <li className="navbar nav-item">
            <a className="contact" href="/userprofile">
              View Profile
            </a>
          </li>
          
          <li className="navbar nav-item">
            <a href="/userlogin" className="contact" onClick={logout}>
              Logout
            </a>
          </li>
        </div>
      </nav>
    </>
  );
}
export default UserNavBar;
