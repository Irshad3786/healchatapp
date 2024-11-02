import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Yourpatients() {

    const navigate = useNavigate()

    const [doctorname,setdoctorname] = useState("")

    const [doctoremail,emailid] = useState("")

    const [response , setresponse] = useState([])

    const [searchitems , setsearchitems] = useState("")

    const [dropdownval , setdropdownval] = useState("patientname")

    axios.defaults.withCredentials = true


 useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/doctorverify`)
    .then(res=> {
      if(res.data.status){
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctorprofile`)
        .then(res => {
          setdoctorname(res.data.doctoruser.doctorname);
          emailid(res.data.doctoruser.doctoremail);
          
          axios.post(`${import.meta.env.VITE_BACKEND_URL}/yourpatients`, { doctoremail: res.data.doctoruser.doctoremail })
            .then(res => {
              setresponse(res.data)
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
        
      }else{
        navigate("/Signup")
      }
    })
    .catch(error=>console.log(error))


    },[navigate])


    const openmaindash = (patientname,patientid,doctoremail)=>{
      navigate("/Workplace",{state:{patientname,patientid,doctoremail}})
      
    }
    

  return (
    <div>
      <div className='bg-black min-h-screen'>
        <h1 className='bg-[#e308ea] font-semibold text-2xl flex justify-center h-16 items-center shadow-xl text-white drop-shadow-sm font-Lexend'>Your Patients</h1>
        
        <input type="search" className='p-2 w-64 rounded-xl flex absolute top-3 left-64 pl-4 shadow-lg font-Lexend' placeholder='Search Patient Name or Id' value={searchitems} onChange={(e)=>{setsearchitems(e.target.value)}}  />
        <div className='absolute top-5 left-56'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 1664 1664"><path fill="white" d="M1152 704q0-185-131.5-316.5T704 256T387.5 387.5T256 704t131.5 316.5T704 1152t316.5-131.5T1152 704m512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124q-143 0-273.5-55.5t-225-150t-150-225T0 704t55.5-273.5t150-225t225-150T704 0t273.5 55.5t225 150t150 225T1408 704q0 220-124 399l343 343q37 37 37 90"/></svg></div>
          <button className='p-2 px-6 rounded-lg shadow-2xl bg-black flex absolute end-10 top-3 font-Lexend text-white'>
          <div className='pr-1'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="1.5"><path d="M12 20a8 8 0 1 1 0-16" opacity="0.5"/><path stroke-linejoin="round" d="M10 12h10m0 0l-3-3m3 3l-3 3"/></g></svg></div>
          logout
        </button>
        <div>
          <div className=' flex  flex-col justify-center items-center p-4 space-y-5'>
          
            {response && Array.isArray(response) ? (
              response.filter((data)=>{
                return searchitems === "" ? data : data.patientid.toLowerCase().includes(searchitems.toLowerCase()) || data.patientname.toLowerCase().includes(searchitems.toLowerCase())
              }).slice().reverse().map((data, index) => (
                <ul className='bg-white p-6 rounded-2xl w-[35%] h-36 font-Lexend' key={index}>
                  <li className='flex items-center justify-between pr-48 overflow-hidden'>
                    <span className='font-bold text-lg flex'><div className='text-[#e308ea] pr-4'>NAME</div>{data.patientname}</span>
                  </li>
                  <li className='flex items-center justify-between pr-8 '>
                    <span className='font-bold text-lg flex'><div className='text-[#e308ea] pr-4 whitespace-nowrap'>PHONE NO</div> {data.patientphoneno}</span>
                    <button className='bg-[#e308ea] p-2 px-8 rounded-xl ml-16' onClick={()=>{openmaindash(data.patientname,data.patientid,doctoremail)}}>OPEN</button>
                  </li>
                  <li className='flex items-center justify-between pr-48 '>
                    <span className='font-bold text-lg flex'><div className='text-[#e308ea] pr-4'>ID</div>{data.patientid}</span>
                  </li>
                </ul>
              ))
            ) : (
              <p>No patients to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Yourpatients
