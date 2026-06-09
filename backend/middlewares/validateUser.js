const validateUser = (req,res,next)=>{
    const {username,password}=req.body;
    
       if(username.length <4) {
          return res.send("Username length should greater than 4.")
         }
       if(password.length<6){
         return res.send("password length should be atleast 6.")
       }
       console.log("validation done")
       next();
    
    

}
module.exports=validateUser;