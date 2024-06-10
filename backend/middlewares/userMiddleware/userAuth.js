const express = require("express");

const jwt = require('jsonwebtoken');
const JWT_SECRET  = process.env.JWT_SECRET;

const userAuth = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message:"authentication header is not correct"
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decode = jwt.verify(token,JWT_SECRET)
        next()
    } catch (error) {
        return res.status(411).json({
            msg:"User is not authenticated"
        })
    }
        
}

module.exports = userAuth;