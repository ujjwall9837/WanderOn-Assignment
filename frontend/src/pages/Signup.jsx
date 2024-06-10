import React, { useState } from 'react'
import Background from '../components/Background'
import LoginCard from '../components/LoginCard'

function Signup() {
  const [signUpData,setSignUpData]=useState({
    email:"",
    password:"",
    firstName:"",
    lastName:"",
    
})
const [error,setError]=useState("")
  return (
    <div>
      <Background/>
      <div className=' absolute z-20  left-1/2 top-[33%] md:top-[40%]  -translate-x-1/2'>
        <LoginCard data={signUpData} setData={setSignUpData} isLogin={false} error={error} setError={setError}/>
      </div>
    </div>
  )
}

export default Signup

