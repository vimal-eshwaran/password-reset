import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import {toast, Toaster} from 'react-hot-toast'

function Login({setToken}) {
  const navigate=useNavigate();
    const[user,setUser]=useState({
        email:""
        ,password:""});

    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            const config = {
                method: 'POST',
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            }
    const response = await fetch('https://password-reset-y8k0.onrender.com/api/register/login',config)
              
              
            const data = await response.json();
            if(response.ok){
              // enter you logic when the fetch is successful
                 console.log(data.token);
                 const token=data.token;
                 setToken(token);
                 localStorage.setItem('token', token);
                 setUser({email:"",password:""});
                 toast.success("Login successful");
                 document.getElementById("login").reset();
                 setTimeout(() => {
                  navigate("/protected");
                 }, 3000);
                }else{
                  toast.error("Email and password not registred")
                }
                
   
        } catch (error) {
            console.log("error",error);
            toast.error("Unable to Login,Check your PassWord and Email are correct");
        }
        


    }    
    
const handlechange=(e)=>{
    e.preventDefault();
    setUser({...user,[e.target.name]: e.target.value })

}


  return (
    <div> 
      <div><Toaster
    position="top-center"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      // Define default options
      className: '',
      duration: 5000,
      style: {
        background: '#363636',
        color: '#fff',
      },
  
      // Default options for specific types
      success: {
        duration: 3000,
        theme: {
          primary: 'green',
          secondary: 'black',
        },
      },
    }}
  
    
    /></div>
        <h3>Login</h3>
        
        <form method='post' onSubmit={handleLogin} id="login">
         <div className="mb-3 col-md-8 mx-auto ">
      <label htmlFor="email" name='email' className="form-label d-flex justify-content-start">Name</label>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
          <FontAwesomeIcon icon={faEnvelope} style={{color: "#2263d3",}} size='xl'/>
            </span></div>
      <input
        type="email"
        className="form-control"
        id="email"
        name='email'
        placeholder="User Email"
        onChange={handlechange}
        required
        
      />
       </div>
    </div>
    <div className="mb-3 col-md-8 mx-auto">
      <label htmlFor="password" name='password' className="form-label d-flex justify-content-start">Password</label>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
          <FontAwesomeIcon icon={faLock} style={{color: "#2263d3",}} size='xl'/>
            </span></div>
      <input
        type="password"
        className="form-control"
        id="password"
        name='password'
        placeholder="Password"
        onChange={handlechange}
        required
        
      />
      </div>
       
         </div>
         <p><Link to='/ForgetPassword'>Forgot Password?</Link></p>
    <div className="d-grid mt-5 col-md-8 mx-auto">
      <button className="btn btn-primary" type="submit">Login</button>
    </div>
    


    </form>
    <hr className='border border-dark'/>
       <div className="d-grid mt-5 col-md-8 mx-auto">
       
        <button className="btn btn-success mb-3 font-weight-bold" type="click"
        onClick={()=>navigate("/register")}
        >New User</button>
             

    </div>



    </div>
  )
}

export default Login
