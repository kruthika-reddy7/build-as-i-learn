const express= require("express");
const router=express.Router();
const bcrypt = require("bcrypt");
const asyncwrapper = require("../utils/asyncwrapper.js");
const jwt = require("jsonwebtoken");
const authMiddleware= require("../middlewares/authMiddleware.js")
const validateUser=require("../middlewares/validateUser.js")
const pool = require('../db.js');
const rateLimit= require('express-rate-limit')
require('dotenv').config();

const authLimiter = rateLimit({
    windowMs:15*60*1000, //15minutes in milliseconds it is 
    limit:20,
    message:{
        message:"too many requests. try again later"
    }
})
console.log(process.env.JWT_SECRET)
const profiles=[{username:"kruthika",hashed:"123456"}]
router.use((req,res,next)=>{
    console.log("hii");
    
    next();
})
router.post('/register',authLimiter,validateUser,async(req,res)=>{
    console.log("hii");
    const {username,password}=req.body
    const hashed= await bcrypt.hash(password,10);
    try{
            await pool.query(
            `INSERT INTO users(username,password)
            VALUES ($1,$2) `,[username,password]
        );
        return res.status(201).json({
            success:true,
            message:"Successfully Registered"
        })
    }
    catch(err){
        /*console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })*/
       throw new Error("invalid credentials")
       next(err);
    }
})

router.post('/login',authLimiter,async(req,res)=>{
    const {username,password}=req.body;
    const hashed=await bcrypt.hash(password,10);
    try{
        const result= await pool.query(
            `SELECT * FROM users WHERE username = $1`,[username]
        )
        const user = result.rows[0];
        console.log(password);
        console.log(hashed);
        console.log(user.password);

        const ismatch = await bcrypt.compare( user.password , hashed);
        console.log(ismatch);
        if(ismatch){
            const token = jwt.sign({
                username:username
            },process.env.JWT_SECRET,{
                expiresIn:'2h'
            })
            res.status(200).json({
                success:true,
                message:"logged in",
                tokenID:token
            })

        }
        else res.status(404).json({
            success:false,
            message:"password mismatch"
        })
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success:false,
            message:"oops"
        })
    }
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
/*router.use((err,req,res,next)=>{
    console.log(err.message)
    return res.status(500).json({
        success:false,
        message:"internal server error"
    })
})*/

module.exports=router