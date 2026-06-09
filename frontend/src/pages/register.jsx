import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate=useNavigate();
    const [form,setForm]=useState({
        username:"",
        password:""
    })
    const [message,setMessage]=useState("")
    const [error,setError]=useState("")
    async function handleRegister(){
        const username=form.username;
        const password=form.password;

        try{
            if(form.username===""){
                throw new Error("Username not Given ")
            }
            if(form.password===""){
                throw new Error("Password not given");
            }
            const response = await fetch(
                "http://localhost:3000/auth/register",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body: JSON.stringify({
                           username,
                           password
                    })
                }
            )
            
        console.log(response);
        const data = await response.json();
        console.log(data);
        if(data.success){
            setMessage("Registered successfully")
            navigate('/login')
        }
        else setMessage(data.message)
        }
        catch(error){
            setError(error.message)
        }
    }
    return (
        <>
        <p>Register</p>
        <input name="username" 
               value={form.username}
               onChange={(e)=>setForm({...form,
               [e.target.name] :e.target.value})}
         />
        <input 
              name="password"
              type="password" 
              value={form.password} 
              onChange={(e)=>
                  setForm({...form,
                  [e.target.name]: e.target.value})}
         />
        <button onClick={handleRegister} >Register</button>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        </>
    )
}
export default Register;