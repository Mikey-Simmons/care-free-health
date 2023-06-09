import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
const UserLogin = () => {
  
  const [user, setUser]=useState({
    userId:"",
    password:""
  })
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const changeHandler= (event)=>{
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    
    setUser({
      ...user,
      [name]:value
    })
  }
  const ProceedLogin = (e) => {
    console.log(user["userId"])
    e.preventDefault();
    if (validate()) {
      axios
        .get("http://localhost:8080/users/" + user.userId)
        .then((res) => {
          return res.data;
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error("Please enter valid user id");
          } else {
            if (resp.password === user["password"]) {
              toast.success("Success", { position: toast.POSITION.TOP_CENTER });
              sessionStorage.setItem("id", user["userId"]);
              sessionStorage.setItem("name", resp.name);
              navigate("/user/home");
            } else {
              toast.error("Please enter valid credentials", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }
        })
        .catch((err) => {
          toast.error("Login failed due to: " + err.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };
  const validate = () => {
    let result = true;
    if (user["userId"] === "" || user["userId"] === null) {
      result = false;
      toast.warning("Please Enter Id", { position: toast.POSITION.TOP_CENTER });
    }
    if (user["password"] === "" || user["password"] === null) {
      result = false;
      toast.warning("Please Enter Password", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    return result;
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="container-login">
        <ToastContainer />
        <div className="" style={{ marginTop: "100px" }}>
          <form onSubmit={ProceedLogin} className="container">
            <div className="card border-primary">
              <div className="card-header">
                <h2>User Login</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>
                    User Id <span className="errmsg"></span>
                  </label>
                  <input
                    value={user["userId"]}
                    onChange={changeHandler}
                    className="form-control"
                    name="userId"
                  ></input>
                </div>
                <div className="form-group">
                  <label>
                    Password <span className="errmsg"></span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default UserLogin;
