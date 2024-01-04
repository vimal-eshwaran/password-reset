import React from 'react'
import { useNavigate } from 'react-router-dom'
import {toast, Toaster} from 'react-hot-toast'

function Protected({logout}) {
  const navigate=useNavigate();


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

        <h3>Welcome to Protected Page using JWT token</h3>

        <button onClick={()=>{
          logout();
          toast.success("Logging out")
          setTimeout(() => {
            navigate("/")
          }, 3000);
          }} className='btn btn-danger'>Logout</button>



    </div>
  )
}

export default Protected