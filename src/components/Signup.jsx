import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from './context/context';
import { useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const {setName} = useContext(MainContext);
    const notify = useRef(null)
    const notify1 = useRef(null)
    const {setLogin} = useContext(MainContext);
    const [username, setname] = useState();
    const [email, setemail] = useState();
    const [pass, setpass]   = useState();
    // const [pic, setpic] = useState();
    const navigate = useNavigate();
    const data = { username, email, pass,
      //  pic 
      };
    const SignupHandler = async (e) => {
      console.log(data);
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:9000/signup', data);
          await setLogin(true); 
          setName(username);
          toast.success('Signup Sucessfully')
          navigate('/world')
      } catch (err) {
        const errorMessage = err.response
          ? err.response.data.msg || err.response.data
          : err.message;
          toast.error(errorMessage);
          if (errorMessage === 'User with provided email or username already exists') {
            if (notify.current) notify.current.style.borderColor = 'red';
            if (notify1.current) notify1.current.style.borderColor = 'red';
          }
      }
  }

  const WhiteHandler=()=>{
    if (notify1.current) notify1.current.style.borderColor = 'white';
    if (notify.current) notify.current.style.borderColor = 'white';
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-950">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700">Chatter</h2>
        <p className="text-center text-gray-600">Sign up to start chatting</p>
        
        <form onSubmit={SignupHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              ref={notify1}
              onClick={WhiteHandler}
              onKeyUp={(e)=>setname(e.target.value)}
              type="text"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
             onClick={WhiteHandler}
             ref={notify}
             onKeyUp={(e)=>setemail(e.target.value)}
              type="email"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              onKeyUp={(e)=>setpass(e.target.value)}
              type="password"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Enter your password"
            />
          </div>

          {/* <div>
            <label className="block text-gray-700">Enter Your Profile Photo Link</label>
            <input
              onKeyUp={(e)=>setpic(e.target.value)}
              type="text"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Enter your Profile Photo Link"
            />
          </div> */}

          <button
          type='submit'
           className="w-full py-3 mt-4 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-blue-700 hover:underline"> Log In</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
