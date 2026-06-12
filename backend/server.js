const express= require('express');
const app = express();
const cors=require ('cors')
const pool=require("./db.js")
const authUser=require("./routes/authUserRoute.js")
app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json());
console.log("hioi")

console.log("hello")
app.use("/auth",authUser);

/*app.post('/register',(req,res)=>{
   
    const {username,password}=req.body;
    
    if(!username || !password){
        return res.status(400).send("bad request from youu")
    }
   let newObj={username,password};
    profiles.push(newObj);
    console.log(profiles)
   return res.status(200).json({
        success:true,
        message:"Registered Successfully. You can login now"
    })
})*/
app.post('/login',(req,res)=>{
      const {username,password}=req.body;
      for(i=0;i<profiles.length;i++){
        console.log(`${profiles[i].username} and ${profiles[i].password}`)
        if(profiles[i].username===username){
            if(profiles[i].password===password){
               return res.json({
                    success:true,
                    message:"Login Successful."
                })
            }
            else return res.json({
                success:false,
                message:"Password not Correct"
            })
        }        
      }
      return res.json({
            success:false,
            message:"Username not found"
        })
})

app.use((err,req,res,next)=>{
    return res.status(404).json({
        success:false,
        message:error.message
    })
})

async function test(){
    const result= await pool.query("select now()");
    console.log(result.rows)
}
test()
app.listen(3000,()=>{
    console.log("app listening on port 3000");
})