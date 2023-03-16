import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom"
const CoachHome =()=>{
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);

    const logout = ()=>{
        sessionStorage.clear();
        navigate('/coachlogin');
    }

    useEffect(()=>{
        let id=sessionStorage.getItem('id');
        let name=sessionStorage.getItem('name');
        if(id===''|| id===null){
            navigate("/");
        }else{
            setId(id);
            setName(name);
        }
    }, []);

    return(
        <>
        <h1>Welcome {name}  </h1>
        <button onClick={logout}>Logout</button>
        </>
    )
     
};export default CoachHome;