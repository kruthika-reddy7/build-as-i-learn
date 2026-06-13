const validateUser = (req,res,next)=>{
    const {username,password}=req.body;
    try{
      if(!username){
        throw new Error("username not given")
      }
      if(!password){
        throw new Error("password not given")
      }
       if(username.length <4) {
          throw new Error("Username length should greater than 4.")
         }
       if(password.length<6){
         throw new Error("password length should be atleast 6.")
       }
       console.log("validation done")
       next();
      }
      catch(err){
        next(err);
      }
    

}
module.exports=validateUser;