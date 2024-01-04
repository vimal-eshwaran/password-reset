
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import {toast, Toaster} from 'react-hot-toast'

function Forget() {
  const navigate=useNavigate();
    const [email,setEmail]=useState({email:""})

const hanldeSubmit= async(e)=>{
    e.preventDefault();

    try {
        
    const config = {
        method: 'POST',
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(email)
    }

const user= await fetch('https://password-reset-wegn.onrender.com/api/forget/forgetPassword',config);
if(user.ok){
const data = await user.json();

              // enter you logic when the fetch is successful
                 console.log(data);
                 document.getElementById("email").value=""
                 setEmail({email:""});
                 toast.success("The Password Reset Email sent to Registerd Email ");
}else{
  document.getElementById("email").value=""
                 setEmail({email:""});
                 toast.error("Email not Registered ");

}    
}
 catch (error) {
            console.log("Error in fetching data",error);
            toast.error("Error in fetching data");
            setTimeout(() => {
              navigate("/")
            }, 3000);
             }


}


const handlechange=(event)=>{
    event.preventDefault();
      setEmail({...email,email:event.target.value})
      console.log(email)
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
      
         <h3>Forget Password</h3>
         <form id="my-form" method='post' onSubmit={hanldeSubmit} className='mt-5'>
         <div className="mb-3 col-md-8 mx-auto">
      <label htmlFor="email" name='email'className="form-label d-flex justify-content-start fw-bold">Email</label>
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
        placeholder="Enter the Registered Email Id"
        onChange={handlechange}
        required
        
      />
      </div>
      
    </div>
    <div className="d-grid mt-5 col-md-8 mx-auto">
      <button className="btn btn-primary fw-bold" type="submit"
      >Send Email</button>
    </div>
    </form>




    </div>
  )
}

export default Forget