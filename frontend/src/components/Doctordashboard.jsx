import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Doctordashboard() {

  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const [doctorname,setdoctorname] = useState("")
  const [specialization,setspecialization] = useState("")
  const [phoneno,setphoneno] = useState("")
  const [email,emailid] = useState("")
  const [medicallicienceno,setmedicallicienceno] = useState("")
  const[profileview,setprofileview] = useState(false)
  const[nameview,setnameview] = useState(true)


  //response data list

  const [patientdatalist,setpatientdatalist] = useState([])
  const [dataview,setdataview] = useState(false)

  //refresh

  const [reload, setReload] = useState(false);



  useEffect(()=>{
   const verifyDoctor = async () => {
      // Poll every 100ms until the 'doctortoken' cookie is available
      while (!document.cookie.includes('doctortoken=')) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms
      }

      // Once the cookie is found, proceed with the verification request
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/doctorverify`);
        if (!res.data.status) {
          navigate("/Signup");
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyDoctor();

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctorprofile`)
    .then(res=>{
      setdoctorname(res.data.doctoruser.doctorname)
    })
    .catch(
      error=>console.log(error)
    )

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctorprofile`)
    .then(res=>{
      emailid(res.data.doctoruser.doctoremail)
    })
    .catch(
      error=>console.log(error)
    )


    patientslist()


  },[navigate,reload])
  
  

  const profilesubmit = ()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctorprofile`)
    .then(res=>{
      if (res){
        setprofileview(true)
        setnameview(false)
        setdataview(false)
      }
      setdoctorname(res.data.doctoruser.doctorname)
      setspecialization(res.data.doctoruser.doctorspecialization)
      setphoneno(res.data.doctoruser.doctorphoneno)
      emailid(res.data.doctoruser.doctoremail)
      setmedicallicienceno(res.data.doctoruser.medicallicienceno)
    })
    .catch(error => console.log(error))
  }


  const patientslist = ()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/patientslist`)
    .then(res=>{
        setpatientdatalist(res.data)
        setdataview(true)
        setnameview(false)
        setprofileview(false)
  })
    .catch(error => console.log(error))
    
  }


  const assigningdoctor = (patientid)=>{

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/assigndoctor`,{patientid,doctorname,email})
    .then( res =>{
      if(res.data.status){
        setReload(!reload);
      }

    }
    )
    .catch(error=>console.log(error))

  }

  const mypatients = ()=>{
    navigate("/Yourpatients")
  }



  return (
    <div>

      <div className='w-full min-h-screen bg-black overflow-hidden '>
          <div className='w-full bg-[#e308ea] flex p-8 space-x-7'>
              <div>
                <button className='flex bg-black rounded-2xl p-4 text-white font-Lexend px-6 ' onClick={profilesubmit}>
                  <div className='pr-1'><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-width="2"><path stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="7" r="3"/></g></svg></div>
                  Profile</button>
              </div>


              <div>
                <button className='flex bg-black rounded-2xl p-4 text-white font-Lexend px-6 ' onClick={patientslist} >
                  <div className='pr-1'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" d="M3.25 7A.75.75 0 0 1 4 6.25h16a.75.75 0 0 1 0 1.5H4A.75.75 0 0 1 3.25 7m0 5a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75m0 5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/></svg></div>
                  Patient List</button>
              </div>


              <div>
                <button className='flex bg-black rounded-2xl p-4 text-white font-Lexend px-6 ' onClick={mypatients}>
                  <div className='pr-1'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="white" d="M16 14q-1.25 0-2.125-.875T13 11t.875-2.125T16 8t2.125.875T19 11t-.875 2.125T16 14m-5 6q-.425 0-.712-.288T10 19v-.9q0-.525.25-1t.7-.75q1.125-.675 2.388-1.012T16 15t2.663.338t2.387 1.012q.45.275.7.75t.25 1v.9q0 .425-.288.713T21 20zm-1-6H4q-.425 0-.712-.288T3 13t.288-.712T4 12h6q.425 0 .713.288T11 13t-.288.713T10 14m4-8H4q-.425 0-.712-.288T3 5t.288-.712T4 4h10q.425 0 .713.288T15 5t-.288.713T14 6m-2.9 4H4q-.425 0-.712-.288T3 9t.288-.712T4 8h8q-.35.425-.562.925T11.1 10"/></svg></div>
                  My Patients</button>
              </div>
              <div className='flex items-center pl-40 font-bold '>
                <h1 className='font-OpenSans text-3xl text-center'>DOCTOR DASHBOARD</h1>
              </div>
              <div className='pl-60'>
                <button className='flex bg-black rounded-2xl p-4 text-white font-Lexend px-6 '>
                  <div className='pr-1'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="1.5"><path d="M12 20a8 8 0 1 1 0-16" opacity="0.5"/><path stroke-linejoin="round" d="M10 12h10m0 0l-3-3m3 3l-3 3"/></g></svg></div>
                  Logout</button>
              </div>
          </div>

          {/*profile*/}

          {profileview && (<div className='pt-16'>
                <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 pt">
                <div class="bg-[#e308ea] p-4">
                  <h1 class="text-black text-3xl text-center font-medium font-Lexend">Doctor Profile</h1>
                </div>
                <div class="p-6">
                  <div class="mb-4">
                    <h2 class="text-xl font-semibold font-Lexend">Name</h2>
                    <p id="doctor-name" class="text-gray-700 font-Lexend">{doctorname}</p>
                  </div>
                  <div class="mb-4">
                    <h2 class="text-xl font-semibold font-Lexend">Specialization</h2>
                    <p id="doctor-specialization" class="text-gray-700 font-Lexend">{specialization}</p>
                  </div>
                  <div class="mb-4">
                    <h2 class="text-xl font-semibold font-Lexend">Phone No</h2>
                    <p id="doctor-phone" class="text-gray-700 font-Lexend">{phoneno}</p>
                  </div>
                  <div class="mb-4">
                    <h2 class="text-xl font-semibold font-Lexend">Email ID</h2>
                    <p id="doctor-email" class="text-gray-700 font-Lexend">{email}</p>
                  </div>
                  <div class="mb-4">
                    <h2 class="text-xl font-semibold font-Lexend">Medical licience No</h2>
                    <p id="doctor-email" class="text-gray-700 font-Lexend">{medicallicienceno}</p>
                  </div>
                </div>
              </div>
          </div>)}

          {/*patient list*/}

          {dataview && (<div>
            <div className='pt-8'>
                <div class=" text-center text-white text-[41px] font-medium font-['Lexend'] leading-[51.27px] tracking-[2.46px]">PATIENT LIST</div>
            </div>

            {patientdatalist.slice().reverse().map((data, index) => (


              <div className='space-y-12 pt-10'key={index} >

                  <div className='bg-white w-full h-24 divide-x-[3px] flex '>
                      <div className='  w-96 h-24'>
                        <div className='flex space-x-1 p-8 overflow-hidden'>
                          <h1 className='font-Lexend text-[#e308ea]'>NAME :</h1>
                          <h1 className='font-Lexend text-black'>{data.patientname}</h1>
                        </div>
                      </div>

                      <div className='  w-96 h-24'>
                        <div className='flex space-x-1 p-8 overflow-hidden'>
                          <h1 className='font-Lexend text-[#e308ea]'>ID :</h1>
                          <h1 className='font-Lexend text-black'>{data.patientid}</h1>
                        </div>
                      </div>

                      <div className='  w-96 h-24'>
                        <div className='flex space-x-1 p-8 overflow-hidden'>
                          <h1 className='font-Lexend text-[#e308ea]'>PHONE NO :</h1>
                          <h1 className='font-Lexend text-black'>{data.patientphoneno}</h1>
                        </div>
                      </div>



                      <div className='w-80 h-24 '>
                      {data.doctorassigned == "NOT ASSIGNED" ? (
                          <div className='p-5 pl-36'>
                            <button className='flex bg-black rounded-2xl p-4 text-white font-Lexend px-6' onClick={() => assigningdoctor(data.patientid)}>
                              <div className='pr-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                  <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1m8-10a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                                </svg>
                              </div>
                              ADD
                            </button>
                          </div>
                        ) : (
                          <div className='p-5 pl-36'>
                            <div className='flex bg-[#e308ea] rounded-2xl p-4 text-white font-Lexend pl-4'>
                              <div className='pr-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                  <path fill="white" d="M21.66 4.25a1 1 0 0 0-1.41.09l-1.87 2.15l-.63-.71a1 1 0 0 0-1.5 1.33l1.39 1.56a1 1 0 0 0 .75.33a1 1 0 0 0 .74-.34l2.61-3a1 1 0 0 0-.08-1.41M10 11a4 4 0 1 0-4-4a4 4 0 0 0 4 4m6 10a1 1 0 0 0 1-1a7 7 0 0 0-14 0a1 1 0 0 0 1 1" />
                                </svg>
                              </div>
                              ASSIGNED
                            </div>
                          </div>
                        )}



                      </div>
                  </div>
              </div>

            ))}


              
          </div>)}




      </div>

      {/* <div className='bg-mycolorthree-950 space-x-9 p-9 shadow-2xl rounded-b-lg'>
        <div className='absolute right-80 text-3xl font-sans font-bold '> 
          <h1>DOCTOR DASHBOARD</h1>
        </div>
        <button className='bg-mycolorfour-950 py-2 px-4 rounded-md shadow-xl font-bold hover:bg-mycolortwo-950 ' onClick={profilesubmit}>PROFILE</button>
        <button className='bg-mycolorfour-950 py-2 px-4 rounded-md shadow-xl font-bold hover:bg-mycolortwo-950' onClick={patientslist}>PATIENTS LIST</button>
        <button className='bg-mycolorfour-950 py-2 px-4 rounded-md shadow-xl font-bold hover:bg-mycolortwo-950'  onClick={mypatients}>YOUR PATIENTS LIST</button>

        <button className='bg-mycolorfour-950 py-2 px-4 rounded-md shadow-xl font-bold hover:bg-red-600 absolute right-24'>LOG OUT</button>
      </div>
      <div className='h-screen bg-white pt-20'>
        {nameview && <div className='flex justify-center items-center text-4xl pt-40 font-semibold'>
        <h1>HI DOCTOR {doctorname}</h1>
        </div>}
        {profileview && <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
          <div class="bg-mycolorthree-950 p-4">
            <h1 class="text-white text-3xl text-center font-bold">Doctor Profile</h1>
          </div>
          <div class="p-6">
            <div class="mb-4">
              <h2 class="text-xl font-semibold">Name</h2>
              <p id="doctor-name" class="text-gray-700">{doctorname}</p>
            </div>
            <div class="mb-4">
              <h2 class="text-xl font-semibold">Specialization</h2>
              <p id="doctor-specialization" class="text-gray-700">{specialization}</p>
            </div>
            <div class="mb-4">
              <h2 class="text-xl font-semibold">Phone No</h2>
              <p id="doctor-phone" class="text-gray-700">{phoneno}</p>
            </div>
            <div class="mb-4">
              <h2 class="text-xl font-semibold">Email ID</h2>
              <p id="doctor-email" class="text-gray-700">{email}</p>
            </div>
            <div class="mb-4">
              <h2 class="text-xl font-semibold">Medical licience No</h2>
              <p id="doctor-email" class="text-gray-700">{medicallicienceno}</p>
            </div>
          </div>
        </div>}

        {dataview && 
        
        <div className='bg-cyan-100 p-5 rounded-xl space-y-6 flex justify-center flex-col '>
          <h1 className='flex justify-center font-bold text-2xl'>PATIENTS LIST</h1>

        { patientdatalist.map((data, index) => (
        <ul className='flex space-x-14 justify-center bg-cyan-700 p-2 rounded-lg text-zinc-200 px-10' key={index}>
        <li >Name: {data.patientname}</li>
        <li >Id: {data.patientid}</li>
        <li>Phone No: {data.patientphoneno}</li>
        <li className={`p-2 rounded-md ${data.doctorassigned == "NOT ASSIGNED"  ? 'bg-red-600' : 'bg-green-400'} text-slate-950`}>
          {data.doctorassigned == "NOT ASSIGNED"  ? 'Not Assigned' : 'Assigned'}
        </li>
        <li>{data.doctorassigned == "NOT ASSIGNED" ? <button className='bg-teal-400 p-2 rounded-lg shadow-gray-950 font-mono text-black shadow-inner hover:bg-teal-700 'onClick={()=>assigningdoctor(data.patientid)}>Click here to Assign</button>:<h1></h1>}</li>
        </ul>
        ))}
        </div>}
      </div> */}
    </div>
  

    
  )
}



export default Doctordashboard
