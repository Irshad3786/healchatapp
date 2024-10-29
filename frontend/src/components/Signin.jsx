import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Signin() {

    const navigate = useNavigate()

    const [patientlogin,setpatientlogin] = useState(false)
    const [doctorlogin,setdoctorlogin] = useState(false)
    const [direction,setdirection] = useState(true)
    const [seletdropdown,setselectdropdown] = useState("")
    

    // //doctors login

    const [doctorname,setdoctorname] = useState("")
    const[doctoremail,setdoctoremail] = useState("")
    const[doctorphoneno , setdoctorphoneno] = useState("")
    const[medicallicienceno,setmedicallicienceno] = useState("")
    const[doctorpassword,setdoctorpassword] = useState("")
    const[doctorconformpassword,setdoctorconformpassword] = useState("")
    const[doctorspecialization,setdoctorspecialization] = useState("")

    // //patient login

    const [patientname,setpatientname] = useState("")
    const [patientemail,setpatientemail] = useState("")
    const [patientphoneno,setpatientphoneno] = useState("")
    const [patientage,setpatientage] = useState("")
    const [patientweight,setpatientweight] = useState("")
    const [patientbloodgroup,setpatientbloodgroup] = useState("")
    const [patientid,setpatientid] = useState("")
    const [patientheight,setpatientheight] = useState("")
    const [patientpassword , setpatientpassword] = useState("")
    const [patientconformpassword,setpatientconformpassword] = useState("")
    const [patientproblem,setpatientproblem] = useState("")
    
    useEffect(()=>{
        if (seletdropdown == "patientSignin"){
            setpatientlogin(true)
            setdoctorlogin(false)
        }else if(seletdropdown == "doctorSignin"){
            setdoctorlogin(true)
            setpatientlogin(false)
        }else{
            setdoctorlogin(false)
            setpatientlogin(false)
        }
        

        if (patientlogin || doctorlogin){
            setdirection(false)
        }else{
            setdirection(true)
        }

    },[seletdropdown,doctorlogin,patientlogin])


    const doctorLoginSubmit = (e)=>{
        e.preventDefault()

        axios.post("http://localhost:3001/DoctorLoginMail",{doctoremail , medicallicienceno})
        .then(response=>{
            if(response.data==="mailmatched" ){
                alert("Email is Already Register")
            }else if(response.data==="medicalliciencenomatched"){
                alert("Medical Licience No is Already Register")
            }else if(response.data==="success"){
                if (doctorname == "" || doctoremail == "" || doctorphoneno == "" || medicallicienceno == "" || doctorpassword==""){
                    alert("Please Fill All Fields")
                }else if(doctorpassword != doctorconformpassword){
                    alert("The Confirm Password Did Not Match")
            
                }else{
                    axios.post('http://localhost:3001/DoctorLogin',{doctorname,doctoremail,doctorphoneno,medicallicienceno,doctorpassword,doctorspecialization})
                    .then(result => console.log(" submited successfull"))
                    .catch(error => console.log(error))
                    navigate('/Signin')
                    setdoctorname("")
                    setdoctoremail("")
                    setdoctorphoneno("")
                    setmedicallicienceno("")
                    setdoctorpassword("")
                    setdoctorconformpassword("")
                    setdoctorspecialization("")
                }
            }
        })

    }


    const patientLoginSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/PatientLoginMail",{patientemail , patientid})
        .then(response => {
            if(response.data==="Emailmatched"){
                alert("Email already exist")
            }else if(response.data==="patientidmated"){
                alert("Patient id already exist")
            }else if (response.data ==="success"){
                if (patientname == "" || patientemail == "" || patientphoneno == "" || patientid == "" || patientpassword=="" || patientbloodgroup == "" || patientweight == "" || patientage == "" || patientheight == "" || patientproblem == ""){
                    alert("Please Fill All Fields")
                }else if(patientpassword != patientconformpassword){
                    alert("The Confirm Password Did Not Match")
                
                }else if(patientage>100){
                    alert("Give the Correct Age")
                
                }else if(patientweight>650){
                    alert("Give the Correct Weight")
                
                }else if(patientheight>15){
                    alert("Give the Correct Height")
                    
                }else{
                    axios.post("http://localhost:3001/PatientLogin",{patientname,patientemail,patientphoneno,patientid,patientpassword,patientage,patientbloodgroup,patientheight,patientweight,patientproblem})
                    .then(result => console.log("submited succesfully"))
                    .catch(error=>console.log(error))
                    navigate('/Signin')
                    setpatientname("")
                    setpatientemail("")
                    setpatientphoneno("")
                    setpatientid("")
                    setpatientpassword("")
                    setpatientconformpassword("")
                }
            }
        })

    }



    
  return (
    <div className='w-full min-h-full bg-black pb-24'>
        
        {/* back button */}
        <div className='p-5' >
            <div className='flex bg-[#e308ea] w-fit  rounded-xl '>
                <div className='p-2 pl-3 '>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="1em" height="2em" viewBox="0 0 12 24"><path fill="white" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>
                </div>

                <Link to ="/"><button class=" text-white text-[20px] font-medium font-['Lexend']  pr-4 pt-2">Home</button></Link>
            </div>
            
        </div>
        

        {/* signup text  and svg */}

        {direction && (
            
            
            <div className='space-y-24 '>
            <div class=" text-center text-white text-6xl font-medium font-['Lexend'] leading-[75.03px] tracking-[3.60px]">SIGN UP</div>

            <div className='flex'>
                <div className='pl-40'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="550.59998" height="412.44495" viewBox="0 0 550.59998 412.44495"><path d="m550.59998,411.25495c0,.65997-.53003,1.19-1.19,1.19H1.19c-.66,0-1.19-.53003-1.19-1.19s.53-1.19,1.19-1.19h548.21997c.65997,0,1.19.53003,1.19,1.19Z" fill="#2e2e43" stroke-width="0"/><path d="m436.65881,84.78436H114.07564c-4.45853,0-8.08586-3.62733-8.08586-8.08586v-24.85271c0-4.45853,3.62733-8.08586,8.08586-8.08586h322.58317c4.45853,0,8.08586,3.62733,8.08586,8.08586v24.85271c0,4.45853-3.62733,8.08586-8.08586,8.08586Z" fill="#fff" stroke="#bab7c9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="m436.65881,237.99009H114.07564c-4.45853,0-8.08586-3.62733-8.08586-8.08586v-24.85271c0-4.45853,3.62733-8.08586,8.08586-8.08586h322.58317c4.45853,0,8.08586,3.62733,8.08586,8.08586v24.85271c0,4.45853-3.62733,8.08586-8.08586,8.08586Z" fill="#fff" stroke="#bab7c9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="m207.65881,347.99009h-94.58317c-4.45853,0-8.08586-3.62733-8.08586-8.08586v-24.85271c0-4.45853,3.62733-8.08586,8.08586-8.08586h94.58317c4.45853,0,8.08586,3.62733,8.08586,8.08586v24.85271c0,4.45853-3.62733,8.08586-8.08586,8.08586Z" fill="#e309eb" stroke-width="0"/><line x1="106.69815" y1="1" x2="177.44809" y2="1" fill="none" stroke="#bab7c9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line x1="106.69815" y1="154.20573" x2="238.12288" y2="154.20573" fill="none" stroke="#bab7c9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><rect x="390.51069" y="369.32254" width="13.20445" height="18.7301" transform="translate(-141.44328 273.52017) rotate(-32.59)" fill="#f1a1a4" stroke-width="0"/><polygon points="362.34782 155.10185 348.29375 159.90111 348.07325 139.60802 360.86264 139.46533 362.34782 155.10185" fill="#f1a1a4" stroke-width="0"/><circle cx="349.71408" cy="131.15741" r="14.05406" fill="#f1a1a4" stroke-width="0"/><path d="m353.55997,129.72413c-2.34774-.0454-3.92371-2.39963-4.86412-4.56578-.9404-2.15319-1.90674-4.64361-4.09234-5.51915-1.79-.71341-4.87708,4.26745-6.3039,2.97036-1.48518-1.35546-.12972-8.43762,1.42032-9.71526s3.67728-1.55003,5.6748-1.67326c4.89654-.27887,9.81904.05837,14.63126,1.01173,2.97035.58369,6.04448,1.48517,8.20414,3.60593,2.74337,2.69147,3.4827,6.79031,3.71619,10.62324.24645,3.92372.05837,8.03552-1.80946,11.49877-1.87432,3.45677-5.83694,6.03151-9.68283,5.20137-.40859-2.08185-.0454-4.21557.08431-6.34281.12972-2.11427-.05837-4.39716-1.36843-6.07042s-4.07289-2.30883-5.55807-.79771" fill="#2f2e43" stroke-width="0"/><path d="m370.90216,134.40016c1.39438-1.04416,3.06115-1.92619,4.79279-1.73162,1.87432.20105,3.46974,1.73162,3.96912,3.54756s-.01946,3.82644-1.15442,5.33107-2.84065,2.5034-4.65658,3.01575c-1.05065.29834-2.19859.42155-3.21033,0-1.48518-.62261-2.30234-2.49692-1.73811-4.00803" fill="#2f2e43" stroke-width="0"/><path id="uuid-31bdf68e-d938-48b7-86ad-7ba8e8b265d3-91-89-41-699" d="m318.60318,267.17111c-.88202,4.62416.87555,8.82674,3.9367,9.37801,3.05466.55127,6.25202-2.75633,7.14053-7.38049.38264-1.84188.29833-3.74861-.24645-5.55807l10.81132-72.48184-14.5664-2.56825-4.79279,73.51952c-1.17387,1.50464-1.95861,3.24924-2.28289,5.11057h0v-.01946h-.00002Z" fill="#f1a1a4" stroke-width="0"/><path d="m348.03434,150.58794l-9.92279.11025c-7.00432,1.13496-8.86567,4.90303-10.37678,11.82954-2.31532,10.56486-5.27271,24.64485-4.6501,24.83943.99228.32427,17.96481,8.08091,26.55809,6.16122l-1.60192-42.94042h-.00649Z" fill="#e309eb" stroke-width="0"/><rect x="347.12191" y="381.03382" width="13.20445" height="18.7301" transform="translate(-4.33864 3.97541) rotate(-.64)" fill="#f1a1a4" stroke-width="0"/><path d="m334.46021,411.32408c-1.39438.01948-2.62014,0-3.55406-.07782-3.51514-.27887-6.8811-2.83416-8.58678-4.32581-.76528-.66802-1.01823-1.75758-.63559-2.69149h0c.2724-.66802.83014-1.18036,1.53057-1.3944l9.24182-2.74984,14.89717-10.29247.16863.29835c.06486.11024,1.5695,2.74984,2.08184,4.53984.19456.68097.15565,1.2452-.12972,1.68621-.19456.3048-.46696.48641-.68746.59665.2724.27887,1.12847.8496,3.76158,1.23871,3.82644.57073,4.59821-3.41137,4.62416-3.58l.02595-.13621.11026-.07782c1.80946-1.1998,2.91847-1.73811,3.3076-1.62786.24645.06484.64206.18806,1.84837,10.97993.11026.33726.90149,2.81472.40859,5.20138-.53181,2.5942-11.84898,1.82242-14.10594,1.6473-.06486.00649-8.52194.70694-14.31995.76528h.01946-.00649v.00008Z" fill="#2f2e43" stroke-width="0"/><path d="m383.21163,408.21105c-1.55004.01948-2.97684-.15565-3.99506-.32427-.99877-.16863-1.79-.95335-1.95861-1.95214h0c-.12972-.71988.08431-1.43976.55774-1.98456l6.38172-7.22485,7.18593-16.61582.3048.16214c.11024.05839,2.78226,1.50464,4.17017,2.74984.52532.47343.79121.97282.79121,1.50464,0,.36319-.13621.66153-.27238.86258.38266.09081,1.40734.11673,3.84589-.9404,3.54754-1.54355,2.0948-5.33105,2.02996-5.48025l-.0519-.12972.05839-.11673c.90149-1.97157,1.56299-3.02222,1.94565-3.13899.24645-.06484.64206-.18806,7.38049,8.33384.27238.22698,2.25694,1.90674,3.10008,4.18964.91444,2.48395-9.07969,7.81501-11.10316,8.85916-.05839.0519-10.5065,7.81501-14.79989,10.03953-1.70569.88202-3.73565,1.17387-5.584,1.18686l.01946.01948h-.00649v.00004Z" fill="#2f2e43" stroke-width="0"/><path d="m368.17827,224.18528l-36.96729.40859-2.97035,34.42499,16.0905,126.90806,18.87278-.21403-8.35981-73.30549,31.35086,65.925,16.64175-11.93332-24.59297-61.59919s7.94473-53.98521,1.08309-67.33236c-6.85517-13.34713-11.14207-13.30175-11.14207-13.30175v.01946h-.00649v.00004Z" fill="#2f2e43" stroke-width="0"/><polygon points="386.58409 226.07905 327.87095 226.73407 344.64242 150.63335 370.22768 150.34149 386.58409 226.07905" fill="#e309eb" stroke-width="0"/><path id="uuid-0d1d7be6-7e67-43a2-9b15-a4bbed67d7bc-92-90-42-700" d="m392.31726,266.35395c.98581,4.61117-.68097,8.84622-3.72266,9.46233-3.04819.6226-6.31686-2.61365-7.29618-7.22485-.42155-1.83538-.38264-3.74212.11673-5.56454l-12.4262-72.2289,14.50157-2.89252,6.4271,73.40277c1.20629,1.47869,2.02996,3.21033,2.39964,5.05867h0v-.01296Z" fill="#f1a1a4" stroke-width="0"/><path d="m360.31137,150.45175l9.92279-.11025c7.02378.9858,8.96942,4.70846,10.64269,11.60254,2.54879,10.51297,5.81099,24.51514,5.20136,24.72918-.99228.33724-17.77673,8.47005-26.40892,6.74491l.65504-42.96637h-.01296Z" fill="#e309eb" stroke-width="0"/></svg>
                </div>
                <div className='pl-80'>
                    <div className=" text-center text-white text-4xl font-medium font-['Lexend'] leading-[75.03px] tracking-[3.60px]">Join as</div>
                    <div className='flex flex-col space-y-5'>
                        <div className='flex space-x-2 bg-[#e308ea] p-4 rounded-md'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48"><path fill="white" fill-rule="evenodd" d="M14.433 33.442a3 3 0 1 0 1.96-.416a9 9 0 0 1-.103-.405a20 20 0 0 1-.32-1.87a17 17 0 0 1-.14-1.914a7 7 0 0 1 .015-.527q.577-.166 1.155-.297c.441-.1.703.42.914.842l.086.169h11.749c.229-.434.748-1.126 1.251-1.011q.806.184 1.609.433l-.003.001q-.003-.003 0 .002c.004.014.026.08.048.22q.038.244.05.625c.014.504-.015 1.117-.074 1.735c-.06.617-.149 1.214-.249 1.685q-.033.157-.066.286H31a1 1 0 0 0-.894.553l-1 2A1 1 0 0 0 29 36v2a1 1 0 0 0 1 1h2v-2h-1v-.764L31.618 35h2.764L35 36.236V37h-1v2h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-.106-.447l-1-2A1 1 0 0 0 35 33h-.636c.107-.533.196-1.155.256-1.779c.066-.674.1-1.373.083-1.983l-.001-.028C38.69 30.895 42 33.666 42 36.57V42H6v-5.43c0-3.032 3.61-5.92 7.831-7.577c.011.622.07 1.325.155 2.006c.092.735.217 1.466.355 2.068q.045.193.092.375M16 37.015c.538 0 1-.44 1-1.015c0-.574-.462-1.015-1-1.015s-1 .44-1 1.015c0 .574.462 1.015 1 1.015M24 24a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10" clip-rule="evenodd"/></svg>
                            </div>
                            <button class=" text-center text-white text-xl font-medium font-['Lexend'] leading-[25.01px] tracking-wide" value="doctorSignin" onClick={(e)=>{setselectdropdown(e.target.value);
                            }}>DOCTOR </button>
                        </div>
                        
                        <div className='flex space-x-2 bg-[#e308ea] p-4 rounded-md'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="white" d="M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.5 0 1 .038t1 .112v2.025q-.5-.1-1-.137T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8h8v2zm2-2h8zm6-6q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m0-2q.825 0 1.413-.587T14 8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m6 14v-5h-2v-6h6l-2 4h2z"/></svg>
                            </div>
                            <button class=" text-center text-white text-xl font-medium font-['Lexend'] leading-[25.01px] tracking-wide" value="patientSignin" onClick={(e)=>{setselectdropdown(e.target.value)}}>PATIENT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)}


        {doctorlogin && (<div> 
            <div class="text-center">
                <div className="text-white text-4xl font-medium font-['Lexend'] leading-[35.03px] tracking-[3.60px]">DOCTOR </div>
                <span className="text-white text-[25px] font-medium font-['Lexend'] leading-[55.02px] tracking-[2.64px]">SIGN UP</span>
            </div>

            <div className='flex justify-between'>
                <div className='pl-64'>
                <form method="post"> <div className=' flex flex-col justify-center items-center pt-14  space-y-6'>
                    <input type="text" placeholder='Full Name' className='p-4 w-80 rounded-xl font-medium  shadow-md' value={doctorname} onChange={(e)=>{setdoctorname(e.target.value)}}/>
                    <input type="text"  placeholder='Email'className='p-4 w-80 rounded-xl font-medium shadow-md'value={doctoremail} onChange={(e)=>{setdoctoremail(e.target.value)}}/>
                    <input type="text" placeholder='PhoneNo' className='p-4 w-80 rounded-xl font-medium shadow-md' value={doctorphoneno} onChange={(e)=>{setdoctorphoneno(e.target.value)}} />
                    <input type="text" placeholder='Medical License Number'className='p-4 w-80 rounded-xl font-medium shadow-md' value={medicallicienceno} onChange={(e)=>{setmedicallicienceno(e.target.value)}}/>
                    <input type="password" placeholder='Password'className='p-4 w-80 rounded-xl font-medium shadow-md' value={doctorpassword} onChange= {(e)=>{setdoctorpassword(e.target.value)}}/>
                    <input type="password" placeholder='Confirm Password' className='p-4 w-80 rounded-xl font-medium shadow-md' value={doctorconformpassword} onChange={(e)=>{setdoctorconformpassword(e.target.value)}}/>
                    <select className='p-2 px-5 font-medium rounded-lg shadow-lg' value={doctorspecialization} onChange={(e)=>{setdoctorspecialization(e.target.value)}}>
                        <option >Specialization</option>
                       <option value="anesthesiology">Anesthesiology</option>
                       <option value="cardiology">Cardiology</option>
                       <option value="dermatology">Dermatology</option>
                       <option value="emergency-medicine">Emergency Medicine</option>
                       <option value="endocrinology">Endocrinology</option>
                       <option value="family-medicine">Family Medicine</option>
                       <option value="gastroenterology">Gastroenterology</option>
                       <option value="general-surgery">General Surgery</option>
                       <option value="geriatrics">Geriatrics</option>
                       <option value="hematology">Hematology</option>
                       <option value="infectious-disease">Infectious Disease</option>
                       <option value="internal-medicine">Internal Medicine</option>
                       <option value="nephrology">Nephrology</option>
                       <option value="neurology">Neurology</option>
                       <option value="obstetrics-gynecology">Obstetrics and Gynecology</option>
                       <option value="oncology">Oncology</option>
                       <option value="ophthalmology">Ophthalmology</option>
                       <option value="orthopedic-surgery">Orthopedic Surgery</option>
                       <option value="otolaryngology">Otolaryngology</option>
                       <option value="pediatrics">Pediatrics</option>
                       <option value="psychiatry">Psychiatry</option>
                       <option value="pulmonology">Pulmonology</option>
                       <option value="radiology">Radiology</option>
                       <option value="rheumatology">Rheumatology</option>
                       <option value="urology">Urology</option>
                       <option value="pathology">Pathology</option>
                       <option value="plastic-surgery">Plastic Surgery</option>
                       <option value="physical-medicine-rehabilitation">Physical Medicine and Rehabilitation</option>
                       <option value="pediatric-surgery">Pediatric Surgery</option>

                        </select>
                        <button className='bg-[#e308ea] text-white p-2 rounded-lg px-4 shadow-lg ' onClick={doctorLoginSubmit}>Submit</button>

                        </div>
                     </form>
                </div>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="692.68042" height="596.95062" viewBox="0 0 692.68042 596.95062"><path d="m0,590.90472c0,.8714.69976,1.57111,1.57114,1.57111h689.53823c.87134,0,1.57104-.69971,1.57104-1.57111,0-.87134-.69977-1.57111-1.57104-1.57111H1.57114c-.87139,0-1.57114.69977-1.57114,1.57111Z" fill="#3f3c57"/><g><polygon points="224.97621 63.44081 232.47475 97.65798 216.52524 145.28497 190.8288 94.11363 194.39423 64.42697 224.97621 63.44081" fill="#fdb4b4"/><rect x="189.49968" y="95.88581" width="44.36823" height="53.60809" fill="#e309eb"/><circle cx="215.62289" cy="50.37625" r="30.30031" fill="#fdb4b4"/><path d="m189.24777,72.90763s-22.58591-41.71245-2.22203-61.78555c20.36388-20.0731,36.71103-6.84618,36.71103-6.84618l9.33479-.37726s1.94691,7.34635,5.0862,3.36946,8.81216,10.50643,8.81216,10.50643c10.52892,18.96209-25.97099,23.20996-25.97099,23.20996,0,0,2.63567,8.3958-.04329,10.15408s-9.83669,8.37259-9.83669,8.37259l-6.40665,4.83868-3.8073-5.80089s-3.97688-3.1393-5.98611-1.82059.75452,18.66962.75452,18.66962l-6.42567-2.49033.00002-.00002s.00002,0,.00002,0Z" fill="#2e2e41"/><polygon points="152.89828 379.77917 141.31369 552.58276 169.7925 553.54815 207.44244 381.22726 152.89828 379.77917" fill="#2e2e41"/><polygon points="221.92319 378.81381 210.33859 551.61743 238.8174 552.58276 276.46735 380.26187 221.92319 378.81381" fill="#2e2e41"/><path d="m145.92245,419.25979l15.16064-188.20752-23.24951-98.00391c-2.00439-14.56836,7.1748-28.35303,21.3418-32.11182l22.75-6.03564,10.06934-10.06982,22.90332,50.57812,14.3042-50.53955,11.15576,8.11328,33.08643,14.59717-.01514.3418-5.30713,118.38818,11.84668,191.27394-.52539.00684-133.521,1.66895v-.00003Z" fill="#e8e9ea"/><path d="m236.98882,550.61914l8.24609,24.61713s32.26085,4.38617,32.7628,14.37354-43.84415,4.20612-69.81137,5.51123-4.35153-26.81537-4.35153-26.81537l2.76715-16.15924,30.38686-1.52722h0v-.00006Z" fill="#2e2e41"/><path d="m169.64642,548.84698l8.24609,24.61713s32.26083,4.38617,32.76282,14.37354-43.84415,4.20612-69.81137,5.51123-4.35153-26.81543-4.35153-26.81543l2.76715-16.15924,30.38686-1.52722h-.00002Z" fill="#2e2e41"/><path id="uuid-2a99fb06-c611-4846-a9cf-67468c4aeefc-743" d="m129.41473,319.30487c-.3497-4.85364.46838-9.72049,2.38571-14.19315l-6.15435-50.48595,24.1083-2.22585,3.64648,51.45175c2.42278,4.21848,3.80009,8.95581,4.01672,13.81573.70905,12.15649-4.98497,22.37265-12.71864,22.82397s-14.57712-9.03418-15.28426-21.18646h.00005l-.00003-.00003.00002-.00003Z" fill="#fdb4b4"/><path id="uuid-a83e19fb-8297-4073-aac4-48fd1880d45d-744" d="m282.1105,326.71539c-.29675-4.85718.57434-9.71481,2.54031-14.16629l-5.60358-50.55005,24.13113-1.96289,3.08533,51.48843c2.37665,4.24463,3.70224,8.9967,3.86588,13.8587.57648,12.16351-5.22858,22.31696-12.96671,22.68396s-14.47775-9.19257-15.05237-21.35181h.00003l-.00003-.00003v-.00003Z" fill="#fdb4b4"/><path d="m125.54696,299.05813l-.08154-.43555-12.56445-67.41455,14.84619-109.77734c1.32471-9.80078,10.07616-16.86084,19.94482-16.07178,5.15381.4126,9.77783,2.85693,13.02148,6.88379,3.24316,4.02686,4.64648,9.06592,3.95117,14.18945l-11.17383,82.33154,7.03516,88.06152s-34.979,2.23291-34.979,2.23291Z" fill="#e8e9ea"/><path d="m274.66464,297.4761l-25.26123-168.62109c-1.31299-4.94434-.54443-10.11865,2.17529-14.51562s7.00586-7.39502,12.06934-8.44238c9.68701-2.00342,19.25244,3.91797,21.78076,13.47852l24.26807,175.98293-35.03223,2.11768v-.00003Z" fill="#e8e9ea"/><circle cx="215.63914" cy="147.72172" r="3.10129" fill="#d6d7d8"/><circle cx="215.63914" cy="171.20295" r="3.10129" fill="#d6d7d8"/><circle cx="215.63914" cy="194.68417" r="3.10129" fill="#d6d7d8"/><circle cx="215.63914" cy="218.1654" r="3.10129" fill="#d6d7d8"/><circle cx="215.63914" cy="241.64662" r="3.10129" fill="#d6d7d8"/><circle cx="215.63914" cy="265.12783" r="3.10129" fill="#d6d7d8"/><circle cx="215.63914" cy="288.60906" r="3.10129" fill="#d6d7d8"/><circle cx="215.63914" cy="312.0903" r="3.10129" fill="#d6d7d8"/><polygon points="215.64284 333.35574 156.96283 325.53573 155.83282 325.38571 125.84284 256.23568 107.98279 215.0657 154.50281 215.0657 215.64284 333.35574" fill="#e309eb"/></g><g><polygon points="450.9183 70.96385 488.22565 50.52592 488.22565 108.91998 445.07889 108.91998 450.9183 70.96385" fill="#2e2e41"/><polygon points="496.2244 83.98281 499.66748 112.65083 474.85278 162.06628 459.45056 116.07353 466.6918 83.0305 496.2244 83.98281" fill="#fdb4b4"/><rect x="458.10519" y="114.36218" width="42.84579" height="51.76859" fill="#e309eb"/><polygon points="536.29645 388.51412 547.48352 555.38818 519.98193 556.32043 483.62393 389.9125 536.29645 388.51412" fill="#2e2e41"/><polygon points="469.64005 387.58184 480.82715 554.45593 453.32556 555.38818 416.9675 388.98025 469.64005 387.58184" fill="#2e2e41"/><path d="m565.35211,423.90725l-.65527-.00195-175.19824-.57227.15723-.62012,45.04297-178.46143-11.2832-90.06299c-2.1377-17.06592,6.99805-33.19678,22.7334-40.13867l5.68066-2.50586,10.79199-7.84814,13.80566,48.78368,22.1084-48.82178,9.73926,9.73779,21.96387,5.82764c13.69043,3.63184,22.55957,16.95166,20.63086,30.98291l-.02344.09766-33.54199,95.70947,48.04785,177.89404Z" fill="#e8e9ea"/><path d="m455.0914,553.49188l29.34415,1.47485,2.67218,15.6048s20.87399,27.15558-4.20221,25.89526-67.90063,4.32257-67.41586-5.32214,31.63858-13.88031,31.63858-13.88031l7.96313-23.7724h0l.00003-.00006Z" fill="#2e2e41"/><path d="m520.12299,551.78057l29.34418,1.47485,2.67218,15.6048s20.87396,27.15558-4.20221,25.89526-67.90063,4.32257-67.41586-5.32214,31.63858-13.88031,31.63858-13.88031l7.96313-23.7724h0v-.00006Z" fill="#2e2e41"/><path id="uuid-3bc2e7c3-8a4e-432b-b93d-ff096d796d3b-745" d="m546.99469,328.40359h.00006c-.68286,11.73526-7.2915,20.89529-14.75983,20.45947-7.46832-.43585-12.96692-10.30145-12.28223-22.0408.20923-4.69315,1.53925-9.26794,3.87891-13.34164l3.52136-49.68625,23.28107,2.14948-5.94318,48.7536c1.85156,4.31918,2.64154,9.01901,2.30383,13.70612v.00003Z" fill="#fdb4b4"/><path id="uuid-a34cbb18-fa14-4c0b-8260-87fab6b8d9f9-746" d="m427.35587,323.94125h.00003c-.93253,11.71808-7.73462,20.73538-15.19196,20.14066s-12.74472-10.57513-11.81027-22.29724c.30905-4.68762,1.73618-9.23306,4.16202-13.25607l4.57819-49.60001,23.23004,2.64456-6.97961,48.61603c1.75919,4.3576,2.44897,9.07321,2.01157,13.75204l-.00003.00003h.00003Z" fill="#fdb4b4"/><path d="m550.74371,308.86965l-33.81152-2.1582.04102-.50684,6.75391-84.54883-10.78906-79.50439c-.67285-4.95215.68359-9.82324,3.81836-13.71533,3.13477-3.89258,7.60449-6.25537,12.58691-6.6543h0c9.53906-.75195,17.99707,6.06201,19.27832,15.53516l14.33691,106.01318-.01465.0791-12.2002,65.46045Z" fill="#e8e9ea"/><path d="m432.98495,305.63088l-33.86523-2.04736.07422-.53467,23.35254-169.37012c2.45605-9.30225,11.70605-15.02393,21.06543-13.08838,4.89453,1.01221,9.03711,3.91016,11.66602,8.16064s3.37207,9.25146,2.0918,14.08252l-24.38477,162.79736Z" fill="#e8e9ea"/><circle cx="475.70847" cy="164.4194" r="2.99487" fill="#d6d7d8"/><circle cx="475.70847" cy="187.09492" r="2.99487" fill="#d6d7d8"/><circle cx="475.70847" cy="209.77041" r="2.99487" fill="#d6d7d8"/><circle cx="475.70847" cy="232.4459" r="2.99487" fill="#d6d7d8"/><circle cx="475.70847" cy="255.12141" r="2.99488" fill="#d6d7d8"/><circle cx="475.70847" cy="277.7969" r="2.99487" fill="#d6d7d8"/><circle cx="475.70847" cy="300.47241" r="2.99487" fill="#d6d7d8"/><circle cx="475.70847" cy="323.14788" r="2.99487" fill="#d6d7d8"/><circle cx="480.25485" cy="70.60121" r="28.0126" fill="#fdb4b4"/><path d="m494.93509,37.9c1.34232,2.73002-.78644,6.14016-3.60379,7.28794s-5.99994.68273-9.00439.20496-6.19162-.93081-9.00061.23728c-3.63461,1.5114-5.68341,5.30272-7.44885,8.82095-3.29578,6.56796-6.59155,13.13592-9.88733,19.70388-1.61026,3.20898-3.25699,6.56223-3.28802,10.15242-.05695,6.59007,5.1709,11.85661,7.98364,17.81652,3.42468,7.25651,3.1423,16.14937-.7359,23.17396-3.8782,7.0246-11.25323,12.00169-19.21866,12.96986-2.09576.25471-4.31387.22707-6.19815-.72504s-3.32245-3.03139-2.97348-5.11353c.6825-4.07246,6.9053-5.02404,8.04816-8.99201.59659-2.07135-.45999-4.28337-1.8844-5.90124s-3.22565-2.87991-4.58432-4.55338c-3.13287-3.85881-3.34158-9.81566-.48651-13.88428,1.67792-2.39111,4.2731-4.1676,5.35754-6.87995.92432-2.31188.58865-4.91064.23856-7.37572-.44983-3.16758-.89969-6.33516-1.34949-9.50274-.52481-3.69564-1.04166-7.52378-.00443-11.1095,2.37692-8.21708,11.65509-12.07628,17.09622-18.67659,2.52844-3.06711,4.22925-6.75578,6.82321-9.76769,4.353-5.0544,11.20612-7.84266,17.85138-7.26305,6.64526.57962,12.91214,4.51224,16.32437,10.24394" fill="#2e2e41"/><path d="m490.51276,38.41812c-1.36856.48943-1.8764,2.27196-1.48245,3.67102.39392,1.39905,1.42548,2.51068,2.36969,3.61567,10.67899,12.4976,13.16113,31.40143,6.07047,46.23225-1.88605,3.94485-4.39844,7.65742-5.41574,11.90996-.7402,3.09426-.70041,6.48836-2.41699,9.1671-1.74765,2.7272-5.21078,4.55455-5.55328,7.77551-.21979,2.06699,1.04007,4.07476,2.72891,5.2866s3.75204,1.76633,5.78091,2.21844c5.27338,1.17508,10.6655,1.8166,16.06738,1.91158,1.76111.03098,3.5784-.00714,5.19394-.70886s2.99451-2.22359,3.01294-3.98486c.01447-1.38427-.78387-2.66127-.88574-4.04187-.30518-4.13684,5.26141-6.33762,6.34595-10.34142.71301-2.63228-.69177-5.34093-2.18835-7.62076-1.49652-2.27983-3.20422-4.6738-3.16742-7.4007.03528-2.61049,1.67352-4.90948,2.31024-7.44138.88068-3.50216-.20117-7.16535-1.27429-10.61342-.91235-2.93147-1.82465-5.86292-2.737-8.79439-.96985-3.11624-1.93964-6.23248-2.90948-9.34872-1.69315-5.44035-3.47049-11.0383-7.13446-15.40172-3.664-4.36341-9.73514-7.22331-15.14719-5.44181" fill="#2e2e41"/></g><g><path d="m509.60117,146.96731l-1.91992-.55957c4-13.71533-4.625-39.31006-4.71191-39.56689l1.89258-.64551c.36621,1.07373,8.91507,26.45605,4.73926,40.77197Z" fill="#3f3c57"/><circle cx="508.64127" cy="154.36679" r="8.3541" fill="#3f3c57"/><path d="m453.7496,183.9429h-5.06641c-.55273,0-1-.44775-1-1s.44727-1,1-1h5.06641c1.39648,0,2.70801-.54395,3.69434-1.53223.98535-.98779,1.52734-2.30078,1.52441-3.69629l-.06152-31.20654c0-6.7793-5.51367-12.29297-12.29102-12.29297s-12.29199,5.51367-12.29199,12.29102l.06152,29.20947c.00586,2.84961,2.3291,5.18555,5.17871,5.20752l3.47754.02637c.55176.00439.99609.45508.99219,1.00781-.00391.54932-.45117.99219-1,.99219h-.00781l-3.47754-.02637c-3.94141-.03027-7.15527-3.26221-7.16309-7.20361l-.06152-29.21143c0-7.88184,6.41113-14.29297,14.29199-14.29297,7.87988,0,14.29102,6.41113,14.29102,14.29102l.06152,31.20459c.00391,1.93066-.74512,3.74658-2.10938,5.11279-1.36328,1.3667-3.17871,2.11963-5.10938,2.11963Z" fill="#3f3c57"/><circle cx="443.03412" cy="180.94929" r="3.54434" fill="#3f3c57"/><circle cx="448.68292" cy="182.94299" r="3.54434" fill="#3f3c57"/></g><path d="m244.07133,131.97773l-1.91992-.55957c4-13.71533-4.52802-39.70649-4.61493-39.96333l2.39981,1.80909c.36621,1.07373,8.31082,24.39789,4.13504,38.71381Z" fill="#3f3c57"/><path d="m176.58131,134.41444l1.91992-.55957c-4-13.71533,4.625-39.31006,4.71191-39.56689l-2.05376,1.37573c-.36621,1.07373-8.75386,24.43481-4.57808,38.75073Z" fill="#3f3c57"/><circle cx="243.11143" cy="139.37721" r="8.35408" fill="#3f3c57"/><path d="m185.48769,185.78889h-5.06641c-.55273,0-1-.44775-1-1s.44727-1,1-1h5.06641c1.39648,0,2.70801-.54395,3.69434-1.53223.98535-.98779,1.52734-2.30078,1.52441-3.69629l-.06152-31.20654c0-6.7793-5.51367-12.29297-12.29102-12.29297s-12.29199,5.51367-12.29199,12.29102l.06152,29.20947c.00586,2.84961,2.3291,5.18555,5.17871,5.20752l3.47754.02637c.55176.00439.99609.45508.99219,1.00781-.00391.54932-.45117.99219-1,.99219h-.00781l-3.47754-.02637c-3.94141-.03027-7.15527-3.26221-7.16309-7.20361l-.06152-29.21143c0-7.88184,6.41113-14.29297,14.29199-14.29297,7.87988,0,14.29102,6.41113,14.29102,14.29102l.06152,31.20459c.00391,1.93066-.74512,3.74658-2.10938,5.11279-1.36328,1.3667-3.17871,2.11963-5.10938,2.11963Z" fill="#3f3c57"/><circle cx="174.7722" cy="182.7953" r="3.54434" fill="#3f3c57"/><circle cx="180.42099" cy="184.78901" r="3.54434" fill="#3f3c57"/></svg>
                </div>
            </div>
           
        </div>)}


        {patientlogin && (<div> 
            <div class="text-center">
                <div className="text-white text-4xl font-medium font-['Lexend'] leading-[35.03px] tracking-[3.60px]">PATIENT  </div>
                <span className="text-white text-[25px] font-medium font-['Lexend'] leading-[55.02px] tracking-[2.64px]">SIGN UP</span>
            </div>

            <div className='flex justify-between'>
                <div className='pl-96'>
                    <form method="post"><div className=' flex flex-col justify-center items-center pt-14  space-y-6 '>
                    <input type="text" placeholder='Full Name' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientname} onChange={(e)=>{setpatientname(e.target.value)}}/>
                    <input type="email"  placeholder='Email'className='p-4 w-80 rounded-xl font-medium shadow-md'value={patientemail} onChange={(e)=>{setpatientemail(e.target.value)}}/>
                    <input type="text" placeholder='+91 PhoneNo' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientphoneno} onChange={(e)=>{setpatientphoneno(e.target.value)}}/>
                    <input type="number" placeholder='Age' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientage} onChange={(e)=>{setpatientage(e.target.value)}}/>
                    <input type="number" placeholder='Weight in KG' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientweight} onChange={(e)=>{setpatientweight(e.target.value)}}/>
                    <input type="number" placeholder='Height in Inches' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientheight} onChange={(e)=>{setpatientheight(e.target.value)}}/>
                    <input type="text" placeholder='Patient Id'className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientid} onChange={(e)=>{setpatientid(e.target.value)}}/>
                    <textarea type="text" placeholder='Describe Problem 'className="p-4 w-80 h-48 rounded-xl font-medium shadow-md resize-none" value={patientproblem} onChange={(e)=>{setpatientproblem(e.target.value)}}/>
                    <select type="text"  className='p-4  px-24 font-medium rounded-lg shadow-lg' value={patientbloodgroup} onChange={(e)=>{setpatientbloodgroup(e.target.value)}}>
                        <option >Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    <input type="password" placeholder='Password'className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientpassword} onChange={(e)=>{setpatientpassword(e.target.value)}}/>
                    <input type="password" placeholder='Confirm Password' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientconformpassword} onChange={(e)=>{setpatientconformpassword(e.target.value)}}/>
                    <button className='bg-[#e308ea] text-white p-2 rounded-lg px-4 shadow-lg ' onClick={patientLoginSubmit}>Submit</button>
                    </div></form>
                </div>
                
                <div className='pr-9'>    
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="509.04617" height="907.58297" viewBox="0 0 509.04617 507.58297" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M849.64684,650.42149c-6.29981,13.08-17.90967,22.81-30.08008,30.72a189.91394,189.91394,0,0,1-42.65967,20.65c-2.06006.71-4.14014,1.37-6.23,2H686.16686c-.58985-.64-1.14991-1.31-1.67969-2-5.66016-7.25-8.72022-16.54-7.61035-25.64,1.43017-11.69,10.31006-22.43,21.81006-24.91,11.51025-2.49,24.62988,4.38,28.12988,15.63,1.92041-21.68,4.14013-44.26,15.66015-62.72,10.44-16.71,28.51026-28.67,48.08985-30.81a60.558,60.558,0,0,1,33.48,6.13c.95019.48,1.89014.98,2.81006,1.5a56.01477,56.01477,0,0,1,16.14013,13.77C855.20689,610.20146,858.19713,632.67149,849.64684,650.42149Z" transform="translate(-345.47691 -196.20851)" fill="#f2f2f2"/><path d="M826.23717,582.34147a317.0801,317.0801,0,0,0-90.56006,119.45c-.29.66-.58008,1.33-.86035,2h-3.98c.28027-.67.56006-1.34.8501-2,3.85009-9,8.10009-17.84,12.77-26.45a321.86119,321.86119,0,0,1,34.91016-51.66,316.96987,316.96987,0,0,1,44.25977-43.95,1.92937,1.92937,0,0,1,.41992-.26,2.03244,2.03244,0,0,1,2.81006,1.5A1.47782,1.47782,0,0,1,826.23717,582.34147Z" transform="translate(-345.47691 -196.20851)" fill="#fff"/><path d="M512.69113,489.79547a9.49736,9.49736,0,0,0-1.2033-14.51328l-4.79626-31.61935-19.70117,6.20064,10.793,28.20962a9.54884,9.54884,0,0,0,14.90777,11.72237Z" transform="translate(-345.47691 -196.20851)" fill="#ffb8b8"/><path d="M492.39552,474.91987l-12.153-56.75662a32.50067,32.50067,0,0,1,9.28145-30.39262c15.55594-14.99054,35.549-33.88518,42.455-38.77257a35.60558,35.60558,0,0,1,22.27647-6.57547l.1667.01833,10.454,9.87947-22.773,37.48872-34.57167,21.66118,3.84723,55.62884Z" transform="translate(-345.47691 -196.20851)" fill="#e309eb"/><rect x="134.47998" y="201.58297" width="59" height="8" rx="4" fill="#ccc"/><rect x="134.47998" y="288.58297" width="59" height="8" rx="4" fill="#ccc"/><path d="M509.95689,702.79149a2.00014,2.00014,0,0,1-1.99218-1.82325l-25.4961-299a2,2,0,1,1,3.98438-.35351l23.4751,276.25146L532.736,401.61961a2.00007,2.00007,0,1,1,3.98535.34375l-24.77173,299a2.00031,2.00031,0,0,1-1.99023,1.82813Z" transform="translate(-345.47691 -196.20851)" fill="#ccc"/><circle cx="221.71456" cy="108.00686" r="26.2388" fill="#ffb8b8"/><polygon points="143.516 494.591 131.038 490.614 140.44 440.589 158.858 446.459 143.516 494.591" fill="#ffb8b8"/><path d="M488.29845,701.86815,448.12731,689.064l.33178-1.04346a15.829,15.829,0,0,1,19.86377-10.26172l25.10889,8.00342Z" transform="translate(-345.47691 -196.20851)" fill="#2f2e41"/><polygon points="234.305 494.332 221.208 494.332 214.975 443.814 234.305 443.814 234.305 494.332" fill="#ffb8b8"/><path d="M541.92613,702.20262H582.089V687.29881H556.73522a14.826,14.826,0,0,0-14.80909,14.80908Z" transform="translate(-345.47691 -196.20851)" fill="#2f2e41"/><path d="M579.39886,674.14679l-4.42041-.65966c-13.407-1.99756-14.20972-2.11719-16.33814-3.05176-1.08691-.47754-1.16333-7.69336-.51074-48.25586.47876-29.77441,1.075-66.82959-.08252-86.72266a3.49939,3.49939,0,0,0-6.70312-1.18066c-9.97559,23.03711-26.71216,74.59033-37.78711,108.7041-3.8523,11.8667-6.895,21.23926-8.82007,26.85742a4.52374,4.52374,0,0,1-5.35352,2.898c-9.114-2.27832-8.50464-3.24707-21.48559-6.60449a4.48877,4.48877,0,0,1-3.28174-5.28174c2.3479-11.07226,45.31445-190.59961,48.60327-207.66553a4.50168,4.50168,0,0,1,5.30518-3.57177c9.67382,1.94922,15.55908,4.01709,25.11889,6.0166,10.31543,2.15771,20.98218,4.38916,31.38648,6.47168h0a4.46279,4.46279,0,0,1,2.61914,1.60547c2.57446,3.25146,6.39184,5.07666,10.43359,7.00879,2.72486,1.30273-3.44971,1.18533-1.07666,3.064,9.60987,7.60739-4.20947,162.08759-12.55957,196.97754a4.51512,4.51512,0,0,1-5.04736,3.39062Z" transform="translate(-345.47691 -196.20851)" fill="#2f2e41"/><path d="M578.3752,327.1751c-1.53189-6.5001,6.21217-20.48653,4.68028-26.98663-1.03742-4.402-11.38856-1.4096-13.8042-5.233s-6.46185-6.92092-10.98412-6.97167c-5.198-.05833-10.31284,3.79748-15.23684,2.131-4.97869-1.685-6.57-8.50289-4.36887-13.27591s6.94276-7.81448,11.62747-10.19775c7.97753-4.05846,17.26629-7.02216,25.80456-4.337,5.16141,1.62317,9.477,5.14031,13.65329,8.58027,3.80691,3.1357,7.67786,6.34249,10.3391,10.495,5.21345,8.13482,4.8989,19.09552.44362,27.66907s-12.57337,14.86516-21.51861,18.51726" transform="translate(-345.47691 -196.20851)" fill="#2f2e41"/><path d="M513.947,478.44172c2.832-4.731,7.1316-26.89746,12.43384-64.10352,3.60987-25.39893,6.75513-51.206,8.31568-64.38867a6.33875,6.33875,0,0,1,3.55957-5.00147q1.519-.73315,3.02-1.38769c12.92309-5.6211,26.01977-7.4834,38.92407-5.53613a70.61872,70.61872,0,0,1,34.91894,15.91113l.11743.11084.03028.1582c.05615.293,5.47583,29.498-5.625,49.22949-10.94824,19.46875-11.07593,71.02637-11.07593,71.54493v.66259l-.63745-.18164c-17.032-4.8667-82.825,3.64746-83.48779,3.73438l-1.02442.13379Z" transform="translate(-345.47691 -196.20851)" fill="#e309eb"/><rect x="212.47998" y="214.58297" width="59" height="8" rx="4" fill="#ccc"/><rect x="212.47998" y="301.58297" width="59" height="8" rx="4" fill="#ccc"/><path d="M587.95689,703.79149a2.00014,2.00014,0,0,1-1.99218-1.82325l-25.4961-287a2,2,0,1,1,3.98438-.35351l23.4751,264.25146L610.736,414.61961a2.00007,2.00007,0,0,1,3.98535.34375l-24.77173,287a2.00031,2.00031,0,0,1-1.99023,1.82813Z" transform="translate(-345.47691 -196.20851)" fill="#ccc"/><path d="M571.48986,499.05847a9.49736,9.49736,0,0,1,8.89632-11.52991l21.20756-23.938,13.16967,15.9105-24.389,17.81707a9.54884,9.54884,0,0,1-18.88457,1.74031Z" transform="translate(-345.47691 -196.20851)" fill="#ffb8b8"/><path d="M583.83758,482.39728l33.457-44.60937-17.25244-36.96973,1.25268-43.8457,14.14429-2.61328.1499.07519A35.60551,35.60551,0,0,1,630.717,372.0589c3.14185,7.85547,9.65894,34.58106,14.57251,55.61817a32.50066,32.50066,0,0,1-8.7229,30.55761l-41.04248,41.043Z" transform="translate(-345.47691 -196.20851)" fill="#e309eb"/><path d="M443.5874,691.38672l45.77295,11.02051a3.9224,3.9224,0,0,0,4.55469-2.126l39.31982-104.542a3.221,3.221,0,0,0,.00342-2.5459,3.6438,3.6438,0,0,0-2.09473-1.96094L496.729,578.08984a4.13866,4.13866,0,0,0-3.37451.18653,3.511,3.511,0,0,0-1.84033,2.25195l-.001.00488-24.29,92.13868-.36084.02246c-.13964.00878-14.06445.95605-20.32617,8.47265A13.29147,13.29147,0,0,0,443.5874,691.38672Z" transform="translate(-345.47691 -196.20851)" fill="#ccc"/><path d="M841.47691,702.79149a.99651.99651,0,0,1-1,1h-494a1,1,0,0,1,0-2h494A.9965.9965,0,0,1,841.47691,702.79149Z" transform="translate(-345.47691 -196.20851)" fill="#3f3d56"/><rect x="496.49761" y="615.00452" width="2.00036" height="41.96505" transform="translate(-532.82219 867.53261) rotate(-83.95484)" fill="#b3b3b3"/><rect x="488.47978" y="639.31409" width="2.00037" height="36.8254" transform="translate(-656.64704 638.02494) rotate(-65.77563)" fill="#b3b3b3"/><polygon points="177.384 426.985 137.801 413.875 138.622 412.051 178.205 425.161 177.384 426.985" fill="#b3b3b3"/><polygon points="181.384 417.985 141.801 398.875 142.622 397.051 182.205 416.161 181.384 417.985" fill="#b3b3b3"/><rect x="482.22839" y="659.10206" width="1.99972" height="37.53461" transform="translate(-691.52954 408.79356) rotate(-49.49475)" fill="#b3b3b3"/><rect x="465.32425" y="672.1761" width="1.99991" height="27.74641" transform="translate(-587.18635 57.62524) rotate(-24.39334)" fill="#b3b3b3"/><path d="M729.81676,674.19562V218.39167c0-6.155.11713-12.32315,0-18.4774-.00512-.26907,0-.53868,0-.80782,0-3.86072-6-3.86711-6,0v455.804c0,6.155-.11713,12.32315,0,18.4774.00512.26907,0,.53868,0,.80782,0,3.86072,6,3.86711,6,0Z" transform="translate(-345.47691 -196.20851)" fill="#f2f2f2"/><path d="M763,326.5H691a6.50753,6.50753,0,0,1-6.5-6.5V232.5A6.50753,6.50753,0,0,1,691,226h72a6.50753,6.50753,0,0,1,6.5,6.5V320A6.50753,6.50753,0,0,1,763,326.5Z" transform="translate(-345.47691 -196.20851)" fill="#f2f2f2"/></svg>
                </div>
            </div>
        </div>)}


        {/* <div className='absolute start-2 top-4'>
            <Link to ="/"><button className='px-4 bg-slate-100 shadow-md font-bold p-2 rounded-md '>Home</button></Link>
        </div>
    
        <div className='flex justify-center pt-5 '>
            <form  method="post">
            <select className='p-2 px-5 font-bold rounded-lg shadow-lg' value={seletdropdown} onChange={(e)=>{
                setselectdropdown(e.target.value)
            }}>
                <option value="selectSigin">Select Signin </option>
                <option value="patientSignin">Patient Signin</option>
                <option value="doctorSignin">Doctor Signi</option>
            </select>
            </form>
        </div>
        
        {direction && (<div className='flex pt-20 items-center h-screen flex-col'>
            <div
                className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-44 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md"
            >
            <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute blur z-10 fill-cyan-600 duration-500 group-hover:blur-none group-hover:scale-105"
                >
                <path
                transform="translate(100 100)"
                d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
                ></path>
            </svg>

                <div className="z-20 flex flex-col justify-center items-center ">
                    <span className="font-bold text-6xl ml-2 text-gray-50">↑</span>
                    <p className="font-bold"></p>
                </div>
        </div>
        <div>
            <h4 className='p-4 text-2xl font-semibold  drop-shadow-md text-slate-950-100 stroke-mycolorfour-950'>Please Select Signin Option</h4>
        </div>

        </div>)}



        {
        doctorlogin && ( <form method="post"> <div className=' flex flex-col justify-center items-center pt-14  space-y-6'>
            <input type="text" placeholder='Full Name' className='p-4 w-80 rounded-xl font-medium shadow-md' value={doctorname} onChange={(e)=>{setdoctorname(e.target.value)}}/>
            <input type="text"  placeholder='Email'className='p-4 w-80 rounded-xl font-medium shadow-md'value={doctoremail} onChange={(e)=>{setdoctoremail(e.target.value)}}/>
            <input type="text" placeholder='PhoneNo' className='p-4 w-80 rounded-xl font-medium shadow-md' value={doctorphoneno} onChange={(e)=>{setdoctorphoneno(e.target.value)}} />
            <input type="text" placeholder='Medical License Number'className='p-4 w-80 rounded-xl font-medium shadow-md' value={medicallicienceno} onChange={(e)=>{setmedicallicienceno(e.target.value)}}/>
            <input type="password" placeholder='Password'className='p-4 w-80 rounded-xl font-medium shadow-md' value={doctorpassword} onChange= {(e)=>{setdoctorpassword(e.target.value)}}/>
            <input type="password" placeholder='Confirm Password' className='p-4 w-80 rounded-xl font-medium shadow-md' value={doctorconformpassword} onChange={(e)=>{setdoctorconformpasswor(e.target.value)}}/>
            <select className='p-2 px-5 font-medium rounded-lg shadow-lg' value={doctorspecialization} onChange={(e)=>{setdoctorspecialization(e.target.value)}}>
                <option >Specialization</option>
                <option value="anesthesiology">Anesthesiology</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="emergency-medicine">Emergency Medicine</option>
                <option value="endocrinology">Endocrinology</option>
                <option value="family-medicine">Family Medicine</option>
                <option value="gastroenterology">Gastroenterology</option>
                <option value="general-surgery">General Surgery</option>
                <option value="geriatrics">Geriatrics</option>
                <option value="hematology">Hematology</option>
                <option value="infectious-disease">Infectious Disease</option>
                <option value="internal-medicine">Internal Medicine</option>
                <option value="nephrology">Nephrology</option>
                <option value="neurology">Neurology</option>
                <option value="obstetrics-gynecology">Obstetrics and Gynecology</option>
                <option value="oncology">Oncology</option>
                <option value="ophthalmology">Ophthalmology</option>
                <option value="orthopedic-surgery">Orthopedic Surgery</option>
                <option value="otolaryngology">Otolaryngology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="psychiatry">Psychiatry</option>
                <option value="pulmonology">Pulmonology</option>
                <option value="radiology">Radiology</option>
                <option value="rheumatology">Rheumatology</option>
                <option value="urology">Urology</option>
                <option value="pathology">Pathology</option>
                <option value="plastic-surgery">Plastic Surgery</option>
                <option value="physical-medicine-rehabilitation">Physical Medicine and Rehabilitation</option>
                <option value="pediatric-surgery">Pediatric Surgery</option>

            </select>
            <button className='bg-black text-slate-300 p-2 rounded-lg px-4 shadow-lg ' onClick={doctorLoginSubmit}>Submit</button>

        </div></form>)}

        {patientlogin && ( <form method="post"><div className=' flex flex-col justify-center items-center pt-14  space-y-6 '>
            <input type="text" placeholder='Full Name' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientname} onChange={(e)=>{setpatientname(e.target.value)}}/>
            <input type="text"  placeholder='Email'className='p-4 w-80 rounded-xl font-medium shadow-md'value={patientemail} onChange={(e)=>{setpatientemail(e.target.value)}}/>
            <input type="text" placeholder='PhoneNo' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientphoneno} onChange={(e)=>{setpatientphoneno(e.target.value)}}/>
            <input type="text" placeholder='Age' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientage} onChange={(e)=>{setpatientage(e.target.value)}}/>
            <input type="text" placeholder='Weight in KG' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientweight} onChange={(e)=>{setpatientweight(e.target.value)}}/>
            <input type="text" placeholder='Height in Inches' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientheight} onChange={(e)=>{setpatientheight(e.target.value)}}/>
            <input type="text" placeholder='Blood Group' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientbloodgroup} onChange={(e)=>{setpatientbloodgroup(e.target.value)}}/>
            <input type="text" placeholder='Patient Id'className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientid} onChange={(e)=>{setpatientid(e.target.value)}}/>
            <textarea type="text" placeholder='Describe Problem 'className="p-4 w-80 h-48 rounded-xl font-medium shadow-md resize-none" value={patientproblem} onChange={(e)=>{setpatientproblem(e.target.value)}}/>
            <input type="password" placeholder='Password'className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientpassword} onChange={(e)=>{setpatientpassword(e.target.value)}}/>
            <input type="password" placeholder='Confirm Password' className='p-4 w-80 rounded-xl font-medium shadow-md' value={patientconformpassword} onChange={(e)=>{setpatientconformpassword(e.target.value)}}/>
            <button className='bg-black text-slate-300 p-2 rounded-lg px-4 shadow-lg ' onClick={patientLoginSubmit}>Submit</button>
        </div></form>)} */}
    </div>
  )
}

export default Signin