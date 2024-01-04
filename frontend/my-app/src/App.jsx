import { useState } from 'react'

import './App.css'

import Register from './components/Register'
import Forget from './components/Forget'
import {BrowserRouter,Route,Routes,Navigate, useNavigate} from 'react-router-dom'
import ResetPage from './components/ResetPage'
import Login from './components/Login'
import Protected from './components/Protected'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
   
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    

  }

  return (
    <>
    
       <div className='container mt-5 border border-2 col-md-6 mycontainer '>
       
<BrowserRouter>
    <Routes>
     
     <Route Component={Register}  path='/Register' />
     <Route element={<Login setToken={setToken}/>}  exact path='/' />
     <Route element={ token? <Protected logout={logout}/>:<Navigate to='/'/>} path='/protected'/>
     <Route Component={Forget}  path='/ForgetPassword' />
     <Route Component={ResetPage}  path='/Reset/:token' />

    </Routes>
    
    </BrowserRouter>
       </div>
    </>
  )
}

export default App
