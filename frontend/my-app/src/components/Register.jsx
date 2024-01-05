import React from 'react'
import { useFormik } from 'formik';
import {toast, Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons'




function Register() {
const navigate=useNavigate();

    const validate = values => {
    const errors = {};
          if (!values.name) {
            console.log(values)
          errors.name = ' Name Required'; 
        }
        if (!values.email) {
          errors.email = ' Email Required';
        } 
        if (!values.password) {
          errors.password = 'Password Required';
        } 
        
        return errors;
      };


     //formik
     const formik = useFormik({
      initialValues: {
        name:'',
        email:'',
        password:'',
      },
      validate ,
      
      onSubmit:(values) => {
  
          
          handleRegister();
          //resetting the form
          formik.resetForm()
        
        
      },
      
    });


      const handleRegister= async()=>{
        // console.log(user)
        try {
            const config = {
                method: 'POST',
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formik.values)};
            // console.log("afteruser");
            
  const response = await fetch('https://password-reset-y8k0.onrender.com/api/signup',config);
        const data = await response.json();
  // enter you logic when the fetch is successful
              console.log(data);
             toast.success("Registration succesful,Redirecting to Login");
             
           setTimeout(()=>{
            navigate("/")
           },2000)
   
        } catch (error) {
            console.log("error",error)
            toast.error();
            toast.error("User already exists!")
            
            // console.log("formik",formik.values)
        }
        


      }
    

    
      

  return (
    <>
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
        <h3>Create a New User</h3>
        <form  onSubmit={formik.handleSubmit} method='post'>
    <div className="mb-3 col-md-8 mx-auto">
      <label htmlFor="name" name='name' className="form-label d-flex justify-content-start fw-bold">Name</label>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
          <FontAwesomeIcon icon={faUser} style={{color: "#2263d3",}} size='xl'/>
            </span></div>
      <input
        type="text"
        className="form-control"
        id="name"
        name='name'
        placeholder="Enter name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      </div>
       {formik.errors.name? <div style={{color:'red'}}>{formik.errors.name}</div> : null}
    </div>
    <div className="mb-3 col-md-8 mx-auto">
      <label htmlFor="email" name='email'className="form-label d-flex justify-content-start fw-bold">Email</label>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
          <FontAwesomeIcon icon={faEnvelope} style={{color: "#2263d3",}} size='xl'/>
            </span></div>
      <input
        type="text"
        className="form-control"
        id="email"
        name='email'
        placeholder="Enter Email Id"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      </div>
       {formik.errors.email? <div style={{color:'red'}}>{formik.errors.email}</div> : null}
    </div>
    <div className="mb-3 col-md-8 mx-auto">
      <label htmlFor="password" name='password' className="form-label d-flex justify-content-start fw-bold">Password</label>
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
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      </div>
       {formik.errors.password? <div style={{color:'red'}}>{formik.errors.password}</div> : null}
    </div>
    <div className="d-grid mt-5 col-md-8 mx-auto">
      <button className="btn btn-primary fw-bold" type="submit">Register</button>
    
    </div>

     
    </form>


    </div>
    
    
    </>
  )
}

export default Register
