import React from 'react'
import{Routes,Route} from "react-router-dom"
import Signup from './components/Signup'
import Home from "./components/Home"
import Signin from "./components/Signin"
import Doctordashboard from './components/Doctordashboard'
import Patientdashboard from './components/Patientdashboard'
import Forgotpassword from './components/Forgotpassword'
import Resetpassword from './components/Resetpassword'
import Resetpasswordpatient from './components/Resetpasswordpatient'
import Yourpatients from './components/Yourpatients'
import Workplace from './components/Workplace'


function Routers() {
  return (
    <div>
        <Routes>
            <Route path='/' element ={<Home/>} />
            <Route path='/Signup' element ={<Signin/>} />
            <Route path='/Signin' element ={<Signup/>}/>
            <Route path='/Doctordashboard' element = {<Doctordashboard/>}/>
            <Route path='/Patientdashboard' element = {<Patientdashboard/>}/>
            <Route path='/ForgotPassword' element={<Forgotpassword/>}/>
            <Route path='/Resetpassword/:doctortoken' element={<Resetpassword/>}/>
            <Route path='/Resetpasswordpatient/:patienttoken' element={<Resetpasswordpatient/>}/>
            <Route path='/Yourpatients' element={<Yourpatients/>}/>
            <Route path='/Workplace' element={<Workplace/>}/>
        </Routes>
    </div>
  )
}

export default Routers