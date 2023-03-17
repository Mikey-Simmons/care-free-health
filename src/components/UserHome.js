import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios"
import UserNavBar from "./UserNavBar";
import SearchBox from "./SearchBox";
const UserHome =()=>{
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [coaches, setCoaches] = useState([]);
    const [searchfield, setSearchfield] = useState('')
    const logout = ()=>{
        sessionStorage.clear();
        navigate('/userlogin');
    }

    useEffect(()=>{
        let id=sessionStorage.getItem('id');
        let name=sessionStorage.getItem('name');
        if(id===''|| id===null){
            navigate("/");
        }else{
            setId(id);
            setName(name);
            async function fetchCoaches() {
                const res = await axios.get("http://localhost:8080/coaches");
                console.log(res.data);
                setCoaches(res.data);
                
              }
            fetchCoaches();
        }
    }, []);
    const onSearchChange = (event) => {
        setSearchfield(  event.target.value )
    }
    const filteredCoaches = coaches.filter(coach => {
        return coach.speciality.toLowerCase().includes(searchfield.toLowerCase());

    })
    return(
        <>

        <UserNavBar></UserNavBar>
        <SearchBox searchChange={onSearchChange}></SearchBox>
        <h1>Welcome {name}  </h1>
        <div className="container2">
        
        {filteredCoaches.map(({name, mobileNumber, speciality,id })=>(
            <div class="card">
            <div class="card-body">
                
              <h5 class="card-title">{name}</h5>
              <h5 class="card-title">Coach Id:  {id}</h5>
              <h5 class="card-title">Mobile Number:  {mobileNumber}</h5>
              <h5 class="card-title">Specialty: {speciality}</h5>
              <button>Book an Appointment</button>
            </div>
          </div>
          
        ))}
        </div>
        
        </>
    )
     
};export default UserHome;