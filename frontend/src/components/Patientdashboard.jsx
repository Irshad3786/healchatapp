import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { io, Socket } from 'socket.io-client'; 
import { useLocation } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from 'react-router-dom';






function Patientdashboard() {
  
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const location = useLocation()
  
  
  


  const [patientid,setpatientid] = useState("")
  const [senderemail,setsenderemail] = useState("")
  const [ senderid , setsenderid] = useState("")
  const [trigger,settrigger]= useState(false)
  const [responsemessage,setresponsemessage]= useState([])
  const [doctorassigned,setdoctorassigned]= useState("")
  const [images,setimages] = useState(null)
  const [buttonchange,setbuttonchange] = useState(true)
  const [loading, setLoading] = useState(false);
  const [patientrealid,setpatientrealid] = useState("")
  const[imageslist,setimageslist] = useState([])
  



  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  

  //chatsocket 

  const [patientmessage,setpatientmessage] = useState("")
  const [patientmessagerecived, setpatientmessagereceived] = useState("")
  const [socket,setsocket] = useState("")

  
  
  





  useEffect(() => {
    axios.get('http://localhost:3001/auth/patientverify')
      .then(res => {
        if (!res.data.status) {
          navigate("/Signup");
        }else{
          axios.get("http://localhost:3001/patientprofile")
          .then((res)=> {
           
            
            setpatientrealid(res.data.patientuser.patientid)
            setdoctorassigned(res.data.patientuser.doctorassigned)
            setpatientid(res.data.patientuser._id)
            setsenderemail(res.data.patientuser.doctorassignedemail)
            setimageslist(res.data.patientuser.patientimages)
            })
          .catch((error)=>console.log(error))
        }
      })
      .catch(error => console.log(error))


      
    
      
    
  }, [navigate,imageslist]);





useEffect(() => {
  
  if(senderemail){
    axios.post("http://localhost:3001/getdoctorid",{senderemail})
    .then(res=>{
    
      
      setsenderid(res.data[0]._id)
    })
    .catch(error => console.log(error)
    )
  }
  
}, [patientid,senderid,trigger])


  useEffect(() => {
    
    if(patientid && senderid){
      axios.post("http://localhost:3001/getchats",{doctorid:senderid,patientid:patientid})
      .then(res=>setresponsemessage(res.data.sendermessage))
      .catch(error=>console.log(error)
      )}


  }, [patientid,senderid,trigger,responsemessage])


  useEffect(() => {
    
    const newsocket = io("http://localhost:3001/chat")
    

    setsocket(newsocket)

    if (patientid) {
      newsocket.emit("join",{userid : patientid , role : "patient"})
    }


    newsocket.on("disconnect", () => {
      console.log("Disconnected from server");
    })
  
    return () => {
      newsocket.disconnect(); 
    };

    
  }, [patientid])
  
  


  const sendmessagepatient = () => {

    if (patientmessage === "") {
      alert("please type message")
    }else{
      socket.emit("sendmessage",{touserid:senderid,fromuserid:patientid,message:patientmessage,role:"patient"})
      setpatientmessage("")
      settrigger(prev => !prev)
    }

  };

  useEffect(() => {
    if(socket){
      socket.on("receivemessage",(message)=>{
        setpatientmessagereceived(message)
        settrigger(prev => !prev)
      })
    }
    
  }, [socket])






  const uploadimage = async (img)=>{
    const data = new FormData();
    data.append("file",img)
    data.append("upload_preset",'images_preset')
    data.append("cloud_name",import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,{
          method:"post",body:data})

      const result = await response.json()

      return result.secure_url

    } catch (error) {
      console.log(error);
      
    }


    
  }


  const imagesubmiting = async (e)=>{
   
    
    e.preventDefault();

    setLoading(true)

    try {

      if(images==null){
        alert("please upload file")
      }else{
        setbuttonchange(false)
        const imageurl = await uploadimage(images)
        
        
        axios.post("http://localhost:3001/setimages",{imageurl : imageurl,patientid:patientrealid})
        .then((res)=>res)
        .catch((error)=>{console.log(error)})
        
        setLoading(false)
        setbuttonchange(true)
      }
      setLoading(false)
      
      
      
    } catch (error) {
      console.log(error);
      
    }
    
  }


  const deletingimage = (data) =>{
    axios.post("http://localhost:3001/deleteimage",{data,patientrealid})
    .then((res)=> res)
    .catch((error)=>console.log(error))
    
  }





  

  

  
  
  

  return (
    <div>
      <div>
      <h1 className='flex absolute end-80 text-3xl top-7 font-Lexend'>Patient Dashboard</h1>
        <div className='bg-[#e308ea] space-x-16 p-4 flex justify-between'>
            
        <div className='flex bg-black w-fit h-fit  rounded-xl '>
                <div className='p-2 pl-3 '>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="0.5em" height="2em" viewBox="0 0 12 24"><path fill="white" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>
                </div>

                <Link to ="/Doctordashboard"><button class=" text-white text-[16px] font-medium font-['Lexend']  pr-4 pt-3">Back</button></Link>
            </div>  
            
                <button className='flex bg-black rounded-2xl p-4 text-white font-Lexend px-6 '>
                  <div className='pr-1'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="1.5"><path d="M12 20a8 8 0 1 1 0-16" opacity="0.5"/><path stroke-linejoin="round" d="M10 12h10m0 0l-3-3m3 3l-3 3"/></g></svg></div>
                  Logout</button>
              

        </div>
      </div>

      <div >
        <div className="flex flex-row h-screen">
        <div className="flex-1 overflow-y-auto p-4 border border-black bg-black">
          <div className='flex flex-col  items-center h-screen space-y-7'>

            <h1 className='font-semibold bg-[#e308ea] p-4 rounded-3xl font-Lexend text-xl '>Image Upload</h1>
          
            <input type="file" accept='image/*' className='bg-white p-2 rounded-md shadow-xl file:p-2 file:border-0 file:rounded-xl file:font-Lexend hover:file:bg-[#e308ea]'  onChange={(e)=>{setimages((pre)=> e.target.files[0])}} />

          {buttonchange && <button className='bg-[#e308ea] p-2  rounded-full px-4 shadow-lg font-Lexend' onClick={imagesubmiting}>submit</button>}
            <BeatLoader
            className='pt-8'
            color={"magenta"}
            loading={loading}
            cssOverride={override}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />

            <div className="flex-1 overflow-y-auto p-4  bg-white w-full h-96 shadow-xl pb-32 space-y-5">



              {imageslist.map((data)=>(
                  <div className='h-24 w-full bg-white rounded-md items-center  flex p-5 ' key={data}  >
                  <img className='h-24 px-6  p-2' src={data}  />
                
                  <div className='pl-6 '>
                    <button className='p-9 font-Lexend text-lg  pl-5 justify-center items-center px-2 py-2 bg-black shadow-2xl  text-white rounded-md flex ' onClick={()=>{deletingimage(data)}} >Remove
                      <div className='p-2'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 36 36"><path fill="white" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m8 22.1a1.4 1.4 0 0 1-2 2l-6-6l-6 6.02a1.4 1.4 0 1 1-2-2l6-6.04l-6.17-6.22a1.4 1.4 0 1 1 2-2L18 16.1l6.17-6.17a1.4 1.4 0 1 1 2 2L20 18.08Z" class="clr-i-solid clr-i-solid-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg></div>
                    </button>
                    
                  </div>
                  </div>

              ))}
              
              
            </div>



          </div>

          <div>
          
        </div>
        
      </div>

      <div className="flex-1 overflow-y-auto p-4 border border-gray-300 bg-black">
        <h1 className="text-xl font-bold mb-4 text-center font-Lexend">CHAT BOX</h1>
            <div>
              
              <div className='font-bold bg-[#e308ea] p-4 rounded-tl-md rounded-tr-md font-Lexend sticky top-0 shadow-xl flex text-black'>
                <div className='pr-4  '><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 448 512"><path fill="black" d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1q-9-.9-18.3-.9h-91.4q-9.3 0-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7zM144 448a24 24 0 1 0 0-48a24 24 0 1 0 0 48"/></svg></div>
                DOCTOR  <div className='pl-2 text-white'> {doctorassigned} </div>
            </div>
        </div>
        <div>

        <div className="flex-1 overflow-y-auto p-4  bg-white w-auto h-96 shadow-xl pb-32">

        <ul className='space-y-2'>

          {responsemessage.map((data)=>(
            <li key={data._id}
            className={`p-4 max-w-max shadow-md rounded-2xl ${data.role ==='patient' ? 'bg-[#e308ea] ml-auto font-Lexend': 'bg-black text-white font-Lexend' }`}><p className='font-semibold break-words'>{data.text}</p>
            <p className='text-xs font-Lexend'>{new Date(data.timestamp).toLocaleTimeString()}</p>
            </li>

          ))}

        </ul>
        
        </div>
        <div className='flex'>
        <input type="text" className='p-2 w-11/12 rounded-bl-2xl bg-gray-150  bg-gray-150 shadow-lg bg-gray-300' value={patientmessage} onChange={(e)=>{setpatientmessage(e.target.value)}}/>
        <button className='bg-[#e308ea] px-3 py-2 rounded-br-2xl flex font-Lexend  'onClick={sendmessagepatient}>Send
          <div className='pl-2'><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m5 12l-.604-5.437C4.223 5.007 5.825 3.864 7.24 4.535l11.944 5.658c1.525.722 1.525 2.892 0 3.614L7.24 19.466c-1.415.67-3.017-.472-2.844-2.028zm0 0h7"/></svg></div>
        </button>
        </div>
        </div>
      </div>

      
    </div>
  

    </div>
    </div>
  )
}

export default Patientdashboard