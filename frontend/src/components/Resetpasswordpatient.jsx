import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Resetpassword() {

  const [password,setpassword] = useState("")
  const[confpassword, setconfpassword] = useState("")
  const {patienttoken} = useParams()

  const navigation = useNavigate()
 

  const submiting= (e)=>{
    e.preventDefault()
    if (password === confpassword){
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/resetpasswordpatient/${patienttoken}`,{password} )
      .then(res=>{
        if(res.data.status){
          navigation("/Signin")
        }
      })
      .catch(err=>console.log(err))
    }else{
      alert("CONFORM PASSWORD IS INCORRECT")
    }
  }

  return (
    <div className='bg-black flex h-screen flex-col items-center justify-center space-y-5'>
      <h1 className='font-Lexend text-white text-3xl'>RESET PASSWORD !!!</h1>
      <div>
        <input type="password" className='p-4 w-80 rounded-xl font-medium' placeholder='Enter New Password' value = {password} onChange={(e)=>{
          setpassword(e.target.value)
        }} /> 
      </div>
      <div>
        <input type="password" className='p-4 w-80 rounded-xl font-medium'  placeholder='Enter conform Password' value = {confpassword} onChange={(e)=>{setconfpassword(e.target.value)}}/>
      </div>
      <button className='bg-[#e308ea] px-2 p-2 rounded-lg shadow-lg'onClick={submiting}>SUBMIT </button>
    </div>
  )
}

export default Resetpassword
