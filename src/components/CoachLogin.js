import React, { useState } from "react";
import axios from "axios"
const CoachLogin = () => {
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("");
  const[data,setData] = useState({
    id: "",
    password:""
  });
 



  
  const handleSubmit = async(event) => {
   
    event.preventDefault();
    
    var yo =  await axios.get("http://localhost:8080/coaches/"+id).then(res=> res.data,setStatus(true)).catch(function(error){
        setId(9999);
        setStatus(false);
        console.log("Error");
    });
    
    
    
    
    
  };
 const handleChange =(event) =>{
     let { name, value } = event.target;
    setData({ ...data, [name]: value })
    
 }
 return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              style={{ width: "40%" }}
              type="text"
              id="id"
              name = "id"
              value={data.name}
              onChange={(e) => {setId(e.target.value)}}
              className="form-control"
              placeholder="Enter Id"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              style={{ width: "40%" }}
              type="password"
              id="password"
              name = "password"
              value={data.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <button onSubmit={handleSubmit} type="submit" className="btn btn-primary">
            Login
          </button>
          {id === 9999 && <div className="text-error">Id is invalid</div>}
          {status === false && <div className="text-error">Enter User Name and Password</div>}
          {status === true  &&id !==9999  && <div className="text-success">Login Successful {id}</div>}
        </form>
      </div>
    </>
  );
};
export default CoachLogin;
