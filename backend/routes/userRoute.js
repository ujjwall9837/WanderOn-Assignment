const express = require("express");
const router = express.Router();

const {Signin ,Signup}  = require("../controller/userController")

router.post("/signin",Signin)
router.post("/signup",Signup)


module.exports = router;