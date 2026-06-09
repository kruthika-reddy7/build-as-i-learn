const express = require("express");
const jwt = require('jsonwebtoken')
 const authMiddleware=(req,res,next)=>{
    const authheader= req.headers.authorization;
    console.log("auth middleware reached")
    if(!authheader){
        return res.status(501).json({
            success:false,
            message:"ivalid request"
        })
      }
    const token= authheader.split(" ")[1];
    const decoded= jwt.verify(token,"secretkey");
    if(!decoded) {
        return res.status(401).json({
            success:false,
            message:"invalid jwt token"
        })
    }
    next()
 }

module.exports=authMiddleware