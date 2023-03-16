import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
const UserLogin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .get("http://localhost:8080/users/" + id)
        .then((res) => {
          return res.data;
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error("Please enter valid user id");
          } else {
            if (resp.password === password) {
              toast.success("Success", { position: toast.POSITION.TOP_CENTER });
              sessionStorage.setItem("id", id);
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
    if (id === "" || id === null) {
      result = false;
      toast.warning("Please Enter Id", { position: toast.POSITION.TOP_CENTER });
    }
    if (password === "" || password === null) {
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
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>
                    Password <span className="errmsg"></span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
};
export default UserLogin;
