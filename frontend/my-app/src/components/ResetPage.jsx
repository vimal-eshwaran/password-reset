import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {toast, Toaster} from 'react-hot-toast'

function ResetPage() {
    const navigate=useNavigate()
    const {token}=useParams();
    const[isreseted,setreset]=useState(false);
    const [password,setpassword]=useState({password:""})

    const handleReset=async (e)=>{
      e.preventDefault();
        try {
            const config = {
                method: 'POST',
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(password)
            };
            console.log("from handlereset")
  const response = await fetch(`https://password-reset-y8k0.onrender.com/api/reset/resetPassword/${token}`,config);
           console.log("res",response);  
            if(response.ok){
            const data = await response.json();
              // enter you logic when the fetch is successful
                 console.log(data);
                setpassword({password:""})
              toast.success("The password reset successful");
              navigate("/");
                // setTimeout(() => {
                //   navigate("/");
                // }, 3000);
              }else{
                toast.error("Error in resetting password")
              }
        } catch (error) {

            console.log("Error in connection",error);
            
        }
       

    }

    const handleChange=(event)=>{
        
        setpassword({...password,password:event.target.value})
         console.log(password)
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
        <h3>Reset Password</h3>
        <form onSubmit={handleReset} method='post' >
        <div className="mb-3 col-md-6 mx-auto">
      <label htmlFor="password" name='password' className="form-label d-flex justify-content-start">Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        name='password'
        placeholder="Password"
        onChange={handleChange}
        required
       
      />
    </div>
    <div className="d-grid mt-5 col-md-6 mx-auto">
      <button className="btn btn-primary" type="submit">Reset</button>
    </div>
        </form>
        {/* <div className='mt-5'>
          {isreseted?<p>password reset successful</p>:null}

        </div> */}
    </div>
    
  )
}

export default ResetPage
