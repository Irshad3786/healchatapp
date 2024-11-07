import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/bg.png'
import BeatLoader from "react-spinners/BeatLoader";

function Signup() {



  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: "absolute",
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const[loginoption,setloginoption] = useState("")
  const[viewinputs,setviewinputs] = useState(false)
  const[email,setemail] = useState("")
  const[password,setpassword] = useState("")

  axios.defaults.withCredentials = true

  const submitinghandler = (e)=>{
    
    setloginoption(e.target.value)
    setviewinputs(e.target.value === "doctorlogin" || e.target.value === "patientlogin")
  }



  const submiting = (e)=>{
    e.preventDefault()
    if (email==="" && password ===""){
      alert("please enter Email and Password")
    }else if(email===""){
      alert("please enter Email ")
    }else if (password === ""){
      alert("please enter Password ")
    }

    setLoading(true)
    
    if (loginoption==="doctorlogin"){
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/Doctorsignin`,{email,password})
      .then(response=>{
        setLoading(false)
        if (response.data === "success") {
          navigate("/Doctordashboard")
        }else if(response.data==="password is incorrect"){
          alert("Password or Email is incorrect")
        }
      })
      .catch(error => { 
        console.error("There was an error with the doctor login!!", error);
      });
    }else if(loginoption === "patientlogin"){
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/Patientsignin`,{email,password})
      .then(response=>{
        setLoading(false)
        if (response.data==="success"){
          navigate("/Patientdashboard",{state:{email}})
        }else if(response.data==="password is incorrect"){
          alert("Password or Email is incorrect")
        }
      })
      .catch(error => { 
        console.error("There was an error with the doctor login!", error);
      });
    }

  }







  return (
    <div className='w-full min-h-screen bg-black overflow-hidden'>

          <BeatLoader
            className='pt-8'
            color={"magenta"}
            loading={loading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />

       <div className='p-5' >
          
            <div className='flex bg-[#e308ea] w-fit rounded-xl '>
            
                <div className='p-2 pl-3 '>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="1em" height="2em" viewBox="0 0 12 24"><path fill="white" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>
                </div>

                <Link to ="/"><button class=" text-white text-[20px] font-medium font-['Lexend']  pr-4 pt-2">Home</button></Link>
              
            </div>
            
        </div>
        

 <div className='relative '>
    {!viewinputs &&(<div class="text-center text-white text-5xl font-medium font-['Lexend'] leading-[75.03px] tracking-[3.60px]">
      SIGN IN
      </div>)}

      {!viewinputs && (<div className=''>
          <img src={bg} className='h-96 absolute right-0 top-0 -mr-96 -mt-28  ' alt='Background' />
      </div>)}

      {viewinputs && (<div className=''>
          <img src={bg} className='h-96 absolute right-0 -mr-96 top-44   ' alt='Background' />
      </div>)}
  </div>


    <div>
      {!viewinputs && (<div className='flex flex-col justify-center items-center pt-28 space-y-6'>
        <div class=" text-center text-white text-[30px] font-medium font-['Lexend'] leading-[50.02px] tracking-widest">Select an option</div>
        
        <div className='bg-[#e308ea] flex rounded-2xl '>
          <button className='font-Lexend text-white text-2xl p-4 pl-9' value="doctorlogin" onClick={submitinghandler} >
            DOCTOR
          </button>
          <div className='p-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="40px" height="40px" viewBox="0 0 50 50" version="1.2" baseProfile="tiny" overflow="inherit"><path d="M42.924 13h-4.924v-5.226c0-3.736-2.948-6.774-6.694-6.774h-12.611c-3.748 0-6.695 3.038-6.695 6.774v5.226h-4.925c-3.356 0-6.075 2.591-6.075 5.937v23.007c0 3.345 2.719 6.056 6.075 6.056h35.849c3.355 0 6.076-2.711 6.076-6.057v-23.006c0-3.346-2.721-5.937-6.076-5.937zm-26.924-5.226c0-1.399 1.292-2.774 2.695-2.774h12.611c1.399 0 2.694 1.375 2.694 2.774v5.226h-18v-5.226zm20 27.226h-7v7h-8v-7h-7v-8h7v-7h8v7h7v8z"/></svg>
          </div>

        </div>

       <div className='bg-[#e308ea] flex rounded-2xl '>
          <button className='font-Lexend text-white text-2xl p-4 pl-9' value="patientlogin" onClick={submitinghandler}>
            PATIENT
          </button>
          <div className='p-4'>
              <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m6.39 8.56C16.71 11.7 14.53 11 12 11s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 4 15.22V22h2v-6.78c0-.38.2-.72.5-.88C7.71 13.73 9.63 13 12 13c.76 0 1.47.07 2.13.2l-1.55 3.3H9.75C8.23 16.5 7 17.73 7 19.25S8.23 22 9.75 22H18c1.1 0 2-.9 2-2v-4.78c0-1.12-.61-2.15-1.61-2.66M10.94 20H9.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.89zM18 20h-4.85l2.94-6.27c.54.2 1.01.41 1.41.61c.3.16.5.5.5.88z"/></svg>
          </div>

        </div>
      </div>)}


       <div className='relative '>

          {!viewinputs &&(<div >
              <img src={bg} className='h-96 absolute left-0 bottom-0  -ml-96 -mb-72  ' alt='Background' />
          </div>)}

          {viewinputs && (<div >
              <img src={bg} className='h-96 absolute left-0 bottom-0 top-10 -ml-96 -mb-96 ' alt='Background' />
          </div>)}

          
      </div>

    {viewinputs && (<div >

      <form method="post" onSubmit={submiting}>
        <div className='flex flex-col justify-center items-center pt-8 space-y-4'>
       
          {loginoption == 'patientlogin' && (<h1 className='text-white text-5xl font-Lexend pb-14'>Patient Login</h1>)}
          {loginoption == 'doctorlogin' && (<h1 className='text-white text-5xl font-Lexend pb-14'>Doctor Login</h1>)}
          
          <div>
            <label htmlFor="email" className="block text-xs font-Lexend text-[#e308ea]">
               Enter your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1  border border-gray-300 rounded-md w-72 p-4"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e)=>{
                setemail(e.target.value)
              }}
              />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-xs font-Lexend text-[#e308ea]">
               Enter your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1  border border-gray-300 rounded-md w-72 p-4"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e)=>{
                setpassword(e.target.value)}}
              />
          </div>

          <button className='bg-[#e308ea] p-2 pl-4 pr-4 rounded-lg'>Login</button>

          <Link to="/ForgotPassword"><h1 className='font-Lexend text-xs text-white underline'>Forgot your Password ?</h1></Link>

          <div className='flex space-x-2 pt-32 items-center'>
            <h1 className='font-Lexend text-xs text-white'>Don't have an Account </h1>
            <Link to="/Signup"><h1 className='font-Lexend text-sm text-[#e308ea] underline'> Signup for HealChat</h1></Link>
          </div>
          
        </div>
        </form>
    </div>)}

      
  </div>


 

  



      
      
      {/* <div className='absolute start-2 top-4'>
        <Link to ="/"><button className='px-4 bg-slate-100 shadow-md font-bold p-2 rounded-md '>Home</button></Link>
      </div>
        <div className='absolute top-40'>
            <select  className=' bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]' value={loginoption} onChange={submitinghandler}>
                <option value="">Login Option</option>
                <option value="doctorlogin">Doctor Login</option>
                <option value="patientlogin">Patient Login</option>
            </select>
        </div>
       <form method="post" onSubmit={submiting}>
        {viewinputs && (<div className='flex flex-col space-y-4'>
        
        <input className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] shadow-lg"name="text" placeholder="Enter email "type="text" value={email} onChange={(e)=>{
          setemail(e.target.value)
        }} />
        
        <input className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] shadow-lg"name="text" placeholder="Enter Password"type="password" value={password} onChange={(e)=>{
          setpassword(e.target.value)
        }}/> 

        <button className="cursor-pointer transition-all bg-mycolortwo-950 text-white px-6 py-2 rounded-lg
        border-mycolorthree-950
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px] shadow-lg" >
        Submit
        </button>
        <div className='flex space-x-9'>
        <Link to="/ForgotPassword">Forgot Password</Link>
        <Link to="/Signin">Create Account</Link>
        </div>
        </div>)}
        </form> */}
    </div>
  )
}

export default Signup

