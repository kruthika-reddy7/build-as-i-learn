import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({setIsLoggedIn}){
    const navigate = useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("")
    async function Handlesubmit(){
        setLoading(true);
        try{
            
             
             
            if(username ===""){
                  throw new Error("username not given")
            }
            else if(password ===""){
                throw new Error("password not given");
            }
            
            const response=await fetch("http://localhost:3000/auth/login",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            console.log(response);
            const data=await response.json();
            console.log(data);
            console.log("logged in");
            if(data.success) {
                setIsLoggedIn(true);
                navigate('/dashboard')
            }
            else throw new Error(data.message)

        }
        catch(error){
            setError(error.message)
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <>
        <p>Login page</p>
        <div>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        
        <button onClick={Handlesubmit} >Login</button>
        {
            loading
            ?<p>logging in ......</p>
            :<p></p>
        }
        <p>{error}</p>
        </>
    )
}
export default Login;