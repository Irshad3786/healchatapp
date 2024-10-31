import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


function Workplace() {

    const location = useLocation()
    
    axios.defaults.withCredentials = true
    const navigate = useNavigate()

    const [doctorid,setdoctorid] = useState("")
    const [patientloginid,setpatientloginid] = useState("")
    const [senderid,setsenderid] = useState("")
    const [trigger,settrigger] = useState(false)
    const [finalresponse,setfinalresponse] = useState([])
    const [patientdata,setpatientdata] = useState([])

    

    //socket

    const [doctormessage , setdoctormessage] = useState("")
    const [doctorreceivedmessage , setdoctorreceivedmessage] = useState("")
    const [socket, setsocket] = useState(null);


   








    useEffect(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/doctorverify`)
        .then(res => {
          if (!res.data.status) {
            navigate("/Signup");
          }else{
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/doctorprofile`)
            .then((res)=>{
              
              setdoctorid(res.data.doctoruser._id);
              setpatientloginid(location.state.patientid)
            })
            .catch((error)=>console.log(error)
            )
          }
        })
        .catch(error => console.log(error));

       

        if(patientloginid){
          axios.post(`${import.meta.env.VITE_BACKEND_URL}/getpatientid`,{patientloginid})
          .then(res=>{
            setsenderid(res.data[0]._id) 
            setpatientdata(res.data[0])
          })
          .catch(error=>{
            console.log(error);
            
          })
        }

        if (doctorid && senderid) {

          axios.post(`${import.meta.env.VITE_BACKEND_URL}/getchats`,{doctorid:doctorid,patientid:senderid})
          .then(res=>{
            setfinalresponse(res.data.sendermessage)
            
          })
          .catch(error=>console.log(error))
        }


        
    }, [navigate,doctorid,senderid,trigger,patientdata]);




    useEffect(() => {
      const newsocket = io(`${import.meta.env.VITE_BACKEND_URL}/chat`,{
        transports: ['websocket']
      })
      setsocket(newsocket)

      if (doctorid) {
        newsocket.emit("join",{userid:doctorid,role:"doctor"})

      }

      newsocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    
      return () => {
        newsocket.disconnect(); 
      };

    }, [doctorid])
    



    const sendingmessage = () => {
      if (doctormessage == "") {
        alert("please type a message")
        
      }else{
        socket.emit("sendmessage",{touserid:senderid,fromuserid:doctorid,message:doctormessage,role:"doctor"})
        setdoctormessage("")
        settrigger(prev=>!prev)
      }
    };


    useEffect(() => {
      if(socket){
        socket.on("receivemessage",(message)=>{
          
          setdoctorreceivedmessage(message)

          settrigger(prev=>!prev)
        })
      }


    }, [socket])
    

  
    
   
    

  return (
    <div >
      <div className=' bg-[#e308ea]  '>
        <div className='flex space-x-20 p-4'>
        <div  >
            <div className='flex bg-black w-fit  rounded-xl '>
                <div className='p-2 pl-3 '>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="0.5em" height="2em" viewBox="0 0 12 24"><path fill="white" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>
                </div>

                <Link to ="/Doctordashboard"><button class=" text-white text-[16px] font-medium font-['Lexend']  pr-4 pt-3">Back</button></Link>
            </div>
            
        </div>
          <h1 className='p-3 font-Lexend text-3xl absolute end-96 text-black'>WORK PLACE</h1>
              <div className='absolute right-3'>
                <button className='flex bg-black rounded-2xl p-4 text-white font-Lexend px-6 '>
                  <div className='pr-1'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="1.5"><path d="M12 20a8 8 0 1 1 0-16" opacity="0.5"/><path stroke-linejoin="round" d="M10 12h10m0 0l-3-3m3 3l-3 3"/></g></svg></div>
                  Logout</button>
              </div>
        </div>
      </div>
      <div className="flex flex-row h-screen">
      <div className="flex-1 overflow-y-auto p-4 border border-gray-300 bg-black">
        <div className='flex justify-center'>
          <h1 className="text-xl font-bold mb-4 bg-[#e308ea] p-2 rounded-2xl px-4 font-Lexend">Patient Information</h1>
        </div>
        <div>
           <ul className='space-y-4 font-Lexend text-white'>
            <li className='flex'><div className='text-[#e308ea] pr-3'>FULL NAME </div> {patientdata.patientname}</li>
            <li className='flex'><div className='text-[#e308ea] pr-3'>BLOOD GROUP</div>{patientdata.patientbloodgroup}</li>
            <li className='flex'><div className='text-[#e308ea] pr-3'>AGE</div>{patientdata.patientage}</li>
            <li className='flex'><div className='text-[#e308ea] pr-3'>WEIGHT</div> {patientdata.patientweight}</li>
            <li className='flex'><div className='text-[#e308ea] pr-3'>HEIGHT</div>{patientdata.patientheight}</li> 
            <li className='bg-white p-2 rounded-md font-Lexend text-black'>PROBLEM : {patientdata.patientproblem}  </li>
            <div className='flex space-x-4'>
            </div>
           </ul>
        </div>

        <div className="flex-1 overflow-y-auto p-4 border border-black bg-black    ">
          <h1 className='text-xl font-semibold  flex justify-center align-middle bg-[#e308ea] p-4 rounded-tl-xl rounded-tr-xl font-Lexend'>Patient Uploaded Images</h1>
        <div className="flex-1 overflow-y-auto p-4  bg-white w-auto h-96 shadow-xl pb-24 space-y-5  ">
           
        {patientdata && patientdata.patientimages ? (   patientdata.patientimages.map((data)=>(
              <a href={data} target="_blank" className='flex  items-center space-x-4  bg-opacity-75 rounded-md ' key={data}  ><img src={data} className='h-24 px-6p-2' />
              <h1 className='bg-[#e308ea] p-4 font-semibold  rounded-xl '>CLICK HERE</h1>
              </a>
            ))) : (
              <p>No patient images available.</p> 
            )}
        </div>

        </div>
        
      </div>
      


      <div className="flex-1 overflow-y-auto p-4 border border-black bg-black">
        <h1 className="text-xl  mb-4 text-center font-Lexend text-white">CHAT BOX</h1>
        <div className='font-bold bg-[#e308ea] p-4 rounded-tl-md rounded-tr-md  sticky top-0 shadow-xl flex space-x-4  font-Lexend'>
          <div className='pr-2'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="black" d="M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.5 0 1 .038t1 .112V20zm8-8q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m6 12v-5h-2v-6h6l-2 4h2z"/></svg>
          </div>PATIENT <div className='text-white'> {location.state.patientname}</div>
        </div>
        <div>
        <div className="flex-1 overflow-y-auto p-4  bg-white w-auto h-96 shadow-xl pb-32">

        <ul className='space-y-2'>

          {finalresponse.map((data)=>(
            <li key={data._id}
            className={`p-4 max-w-max rounded-2xl shadow-md ${data.role ==='doctor' ? 'bg-[#e308ea] font-Lexend ml-auto': 'bg-black font-Lexend text-white' }`}><p className='font-semibold break-words'>{data.text}</p>
            <p className='font-light text-xs'>{new Date(data.timestamp).toLocaleTimeString()}</p>
            </li>

          ))}

          </ul>
        </div >
          <div className='flex'>
          <input type="text" className='p-2 w-11/12 rounded-bl-2xl bg-gray-150 shadow-lg bg-gray-300'value = {doctormessage}  onChange={(e)=>{setdoctormessage(e.target.value)}}/>
          <button className='bg-[#e308ea] px-3 py-2 rounded-br-2xl flex font-Lexend' onClick={sendingmessage}>Send
            <div><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m5 12l-.604-5.437C4.223 5.007 5.825 3.864 7.24 4.535l11.944 5.658c1.525.722 1.525 2.892 0 3.614L7.24 19.466c-1.415.67-3.017-.472-2.844-2.028zm0 0h7"/></svg></div>
          </button>
          </div>

        </div>
      </div>

      
    </div>

    </div>
  )
}

export default Workplace
