const jwt = require('jsonwebtoken');
const {z} = require("zod")
const bcrypt = require('bcrypt');
const mongoSanitize = require('express-mongo-sanitize');

const {User} = require("../db/Schema");
const  JWT_SECRET  = process.env.JWT_SECRET;
const {saltRounds} = require("../config/config");

const userSignin =z.object({
    email:z.string().email().min(3, { message: "username must be 3 or more characters long" })
    .max(30,{message:"username must be 30 or less characters long"}),
    password:z.string().min(5,{message:"password must be more than 5 length"})
})

const userSignup =z.object({
    email:z.string().email().min(3, { message: "username must be 3 or more characters long" })
    .max(30,{message:"username must be 30 or less characters long"}),
    password:z.string().min(5,{message:"password must be more than 5 length"}),
    firstName:z.string().min(1,{message:"First name should not be empty"}).max(50, { message: "firstName must be 50 or less 50 long" }),
    lastName:z.string().min(1,{message:"Last name should not be empty"}).max(50, { message: "lastName must be 50 or less 50 long" })
})



const Signin = async (req,res)=>{
    console.log("requested body is",req.body)
    mongoSanitize.sanitize(req.body,{
        allowDots: true,
    });

    const email =req.body.email
    const password =req.body.password
    
    try {
        userSignin.parse({email,password})
        const userExist = await User.findOne({email});
       
        if(userExist){
            const result = await bcrypt.compare(password,userExist.password)
            if(result){
        
                    var token = jwt.sign({ email }, JWT_SECRET);
                    res.status(200).json({
                        message: "successfully login",
                        firstName:userExist.firstName,
                        lastName:userExist.lastName,
                        token
                    })  
            }else{
                res.status(411).json({
                    message: ["Password is incorrect"]
                })
            }
            

        }else{
            res.status(411).json({
                message: ["User does not exist"]
            })
        }
    } catch (error) {
        console.log("error is ",error.message)
        if(error.name==="ZodError"){
            return res.status(411).json({
                message: error.errors.map(err => err.message),
            });
        }
        return res.status(411).json({
            message: ["Error while sign in"]
        });
    }

}

const Signup = async (req,res)=>{

    mongoSanitize.sanitize(req.body,{
        allowDots: true,
      });

    const email =req.body.email
    const password =req.body.password
    const firstName =req.body.firstName
    const lastName =req.body.lastName

    console.log("email is",email," Pawword is ",password," first name is ",firstName," last name is ",lastName)
    try {
        userSignup.parse({ email, password, firstName, lastName });
        
        const userExist = await User.findOne({email});
        console.log("user exist",userExist);

        if(userExist){
            
            return res.status(411).json({
                message: ["Email already taken"]
            })

        }else{
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log("hased password is ",hashedPassword);
            const user = await User.create({
                email,
                password:hashedPassword,
                firstName,
                lastName,
            })
            if(user){
                var token = jwt.sign({ email }, JWT_SECRET);
                return res.status(200).json({
                    token   
                })
                
            }else{
                return res.status(411).json({
                    message: ["Signed up failed"]
                })
            }
        
        }
    } catch (error) {

        console.log("error is ",error.message)
        if(error.name==="ZodError"){
            return res.status(411).json({
                message: error.errors.map(err => err.message),
            });
        }
        return res.status(411).json({
            message: ["Error while sign up"]
        });
    } 
    
}


module.exports = {Signin,Signup}