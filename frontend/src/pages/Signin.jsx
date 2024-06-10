import React, { useState } from 'react';
import Background from '../components/Background';
import LoginCard from '../components/LoginCard';

function Signin() {
  const [signInData,setSignInData]=useState({
    email:"",
    password:"",
    
})

  return (
    <div>
      <Background/>
      <div className=' absolute z-20  left-1/2  top-[40%]  -translate-x-1/2'>
          <LoginCard data={signInData} setData={setSignInData} isLogin={true}/>
      </div>
    </div>
  );
}

export default Signin;
