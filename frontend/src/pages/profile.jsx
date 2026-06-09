import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Profile(){
    const token= localStorage.getItem("token")
    const [body,setBody]=useState("u r not authenticated")
 async function GetProfile() {
         const response = await fetch("http://localhost:3000/auth/profile",{
            method:"GET",
            headers:{
                Authorization : `Bearer ${token}`,
                
            }
             })
        const data = await response.json();
        if(data.success){
            setBody(data.message);
            console.log("jwt auth success")
        }
    } 
    GetProfile();
    return (
        <>
            <p>{body} </p>
        </>
    )
}
export default Profile;