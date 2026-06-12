const express= require("express");
const router=express.Router();
const bcrypt = require("bcrypt");
const asyncwrapper = require("../utils/asyncwrapper.js");
const jwt = require("jsonwebtoken");
const authMiddleware= require("../middlewares/authMiddleware.js")
const validateUser=require("../middlewares/validateUser.js")
const pool = require('../db.js');

const profiles=[{username:"kruthika",hashed:"123456"}]
router.use((req,res,next)=>{
    console.log("hii");
    next();
})
router.post('/register',validateUser,async(req,res)=>{
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
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
})

router.post('/login',async(req,res)=>{
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
            },"secretkey",{
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

module.exports=router