const express= require("express");
const router=express.Router();
const bcrypt = require("bcrypt");
const asyncwrapper = require("../utils/asyncwrapper.js");
const jwt = require("jsonwebtoken");
const authMiddleware= require("../middlewares/authMiddleware.js")
const validateUser=require("../middlewares/validateUser.js")

const profiles=[{username:"kruthika",hashed:"123456"}]
router.use((req,res,next)=>{
    console.log("hii");
    next();
})
router.post('/register',validateUser,async(req,res)=>{
    console.log("hii")
    //try{
    const {username,password}=req.body
    const hashed= await bcrypt.hash(password,10);
    let newObj={username,hashed};
    for(let i=0;i<profiles.length;i++){
        if(profiles[i].username===username){
            return res.json({
                success:false,
                message:"give a different username bro"
            })
        }
    }
    profiles.push(newObj);
    
    console.log(profiles)
       return res.status(200).json({
        success:true,
        message:"Registered Successfully. You can login now",
        //tokenId: token
    })
})

router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    //const hashed=await bcrypt.hash(password,10);
    for(let i=0;i<profiles.length;i++){
        if(profiles[i].username===username){
            const ismatch= await bcrypt.compare(password,profiles[i].hashed);
            if(ismatch){
                const token = jwt.sign({
                   id:i, username:username
               },"secretkey", {
                      expiresIn: '10s'
               })
                return res.json({
                    success:true,
                    message:"logged in",
                    tokenID:token
                })
            }
            else {
                //console.log(hashed);
                return res.json({
                    
                        success:false,
                        message:"password incorrect"
                    })
                }
            }
        }
        return res.json({message:"u are not found"})
    }
    
)

router.get('/profile',authMiddleware,(req,res)=>{
         return res.status(200).json({
            success:true,
            message: "valid jwt"
         })
})
   // }
   /* catch(err){
        return res.status(500).json({
            message:error.message
        })
    }*/

module.exports=router