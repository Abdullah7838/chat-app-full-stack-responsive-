import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from './context/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
   const navigate = useNavigate();
    const {setLogin} = useContext(MainContext);
    const [email, setemail] = useState();
    const [pass, setpass]   = useState();
    const [state, setstate] = useState();
    const {setName} =useContext(MainContext)
const loginHandler= async (e)=>{
    e.preventDefault();
const data={email,pass}
try{
 const res = await axios.post('http://localhost:9000/login',data);
 toast.success('Login Sucessfully')
 setLogin(true)
 setName(email)
 navigate('/world')
}catch(err){
  if(err?.message==="Request failed with status code 401"){
toast.error("Invalid Username or Password");
}else{
  toast.error(err?.message);
}
console.log(err)
}
}

  return (
    <div className='flex justify-center items-center h-screen bg-blue-950'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
        <h2 className='text-3xl font-bold text-center text-blue-700 mb-6'>Chatter Login</h2>
        <form onSubmit={loginHandler}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
              Email or Username
            </label>
            <input
              onKeyUp={(e)=>setemail(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='text'
              id='email'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <input
              onKeyUp={(e)=>setpass(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='password'
              id='password'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-700 text-white py-2 rounded-md font-bold hover:bg-blue-600 transition-colors'
          >
            Log In
          </button>
        </form>
        <div className='text-center mt-4'>
          <p className='text-gray-700'>
            Don't have an account? <Link to='/signup' className='text-blue-700 underline'>Sign Up</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
