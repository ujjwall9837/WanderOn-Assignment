const express = require("express");
const app = express();
var cors = require('cors')
const rateLimit = require('express-rate-limit');
var xss = require("xss");

const {PORT} = require("./config/config");

const mainRouter = require("./routes/index")

app.use(cors())
app.use(xss)
app.use(express.json());

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per 5 min
    message: 'Too many requests from this IP, please try again later'
  });
  
// Applying rate limiting to all routes
app.use(limiter);

app.use("/api/v1",mainRouter)

app.listen(PORT,()=>{
    console.log("Backend is connected to the port number",PORT)
})