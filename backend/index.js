const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const Doctorloginmodel = require('./models/doctorloginmodel')
const Patientloginmodel = require('./models/patientloginmodel')
const Chatmodel = require('./models/chat')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieparser = require("cookie-parser")
const dotenv = require("dotenv").config()
const  nodemailer = require('nodemailer');
const http = require('http');
const app = express()
const server = http.createServer(app);
const { Server } = require("socket.io");
const { Socket } = require('dgram');
const multer = require('multer')





const io = new Server(server, {
  cors: {
    origin: "https://healchat.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  }
});


app.use(express.json())

app.use(cors(
  {
    origin:"https://healchat.vercel.app",
    methods: ["GET","POST"],
    credentials: true
  }


))

app.use(cookieparser())

mongoose.connect("mongodb+srv://irshad9182278505:Bablu.786@cluster0.ktpiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


app.post("/DoctorLoginMail",async(req,res)=>{
  const{doctoremail,medicallicienceno} = req.body
  try {
    const responseone = await Doctorloginmodel.findOne({doctoremail})
    const responsetwo = await Doctorloginmodel.findOne({medicallicienceno})
    if(responseone){
      res.json("mailmatched")
    }else if(responsetwo){
      res.json("medicalliciencenomatched")
    }else{
      res.json("success")
    }

  } catch (error) {
    res.json(error)
  }

})


app.post("/PatientLoginMail",async(req,res)=>{
  const{patientemail,patientid} = req.body
  try {
    const responseone = await Patientloginmodel.findOne({patientemail})
    const responsetwo = await Patientloginmodel.findOne({patientid})
    
    if(responseone){
      res.json("Emailmatched")
    }else if(responsetwo){
      res.json("patientidmated")
    }else{
      res.json("success")
    }

  } catch (error) {
    res.json(error)
  }

})



app.post("/DoctorLogin",(req,res)=>{
    const {doctorname,doctoremail,doctorphoneno,medicallicienceno,doctorpassword,doctorspecialization} = req.body
    bcrypt.hash(doctorpassword,10)
    .then(hashpass => {
        Doctorloginmodel.create({doctorname,doctoremail,doctorphoneno,medicallicienceno,doctorpassword:
            hashpass,doctorspecialization})
        .then(doctordata => res.json(doctordata))
        .catch(error => res.json(error))
    })
    .catch(error=>console.log(error.mess))
    
})


app.post("/PatientLogin",(req,res)=>{

    const {patientname,patientemail,patientphoneno,patientid,patientpassword,patientage,patientweight,patientheight,patientbloodgroup,patientproblem} = req.body

    bcrypt.hash(patientpassword,10)
    .then(hashpass => {
        Patientloginmodel.create({patientname,patientemail,patientphoneno,patientage,patientbloodgroup,patientweight,patientheight,patientid,patientproblem,patientpassword:hashpass})
        .then(patientdata => res.json(patientdata))
        .catch(error => res.json(error))
    })
    .catch(error=>console.log(error.message))
    
})



app.post("/Doctorsignin", async (req, res) => {
    const { email, password } = req.body;

    console.log(email)
  
    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }
  
    try {
      const response = await Doctorloginmodel.findOne({ doctoremail: email });
      console.log(response)
      if (response) {
        const match = await bcrypt.compare(password, response.doctorpassword);
        console.log(match)
        if (match) {
          const doctortoken = jwt.sign({doctoremail :response.doctoremail},process.env.JWTCODE,{expiresIn:"1d"})
          console.log(doctortoken)
          res.cookie("doctortoken", doctortoken,{ secure: true, httpOnly: true, sameSite: 'Strict' })
          res.json("success");
        } else {
          res.json("password is incorrect");
        }
      } else {
        res.json("No user Found please signup");
      }
    } catch (error) {
      
      res.status(500).json("Internal Server Error");
    }
  });
  
  app.post("/Patientsignin", async (req, res) => {
    const { email, password } = req.body;
  
  
    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }
  
    try {
      const response = await Patientloginmodel.findOne({ patientemail: email });
      if (response) {
        const match = await bcrypt.compare(password, response.patientpassword);
        if (match) {
          const patienttoken = jwt.sign({patientemail :response.patientemail},process.env.JWTCODE,{expiresIn:"1d"})
          res.cookie("patienttoken", patienttoken,{ secure: true, httpOnly: true, sameSite: 'Strict' })
          res.json("success");
        } else {
          res.json("password is incorrect");
        }
      } else {
        res.json("No user Found please signup");
      }
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  });


  const doctorverifyUser = () => {
    return async (req, res, next) => {
      try {
        const doctortoken = req.cookies.doctortoken;
        if (!doctortoken) {
          return res.json({ status: false, message: "No token" });
        }
        const decoded = await jwt.verify(doctortoken, process.env.JWTCODE);
        req.user = decoded;
        next();
      } catch (error) {
        res.json({ status: false, message: "Invalid token" });
      }
    };
  };


  const patientverifyUser = () => {
    return async (req, res, next) => {
      try {
        const patienttoken = req.cookies.patienttoken;
        if (!patienttoken) {
          return res.json({ status: false, message: "No token" });
        }
        const decoded = await jwt.verify(patienttoken, process.env.JWTCODE);
        req.user = decoded;
        next();
      } catch (error) {
        res.json({ status: false, message: "Invalid token" });
      }
    };
  };




  app.get('/auth/patientverify',patientverifyUser(),(req,res)=>{
    return res.json({status: true,message:"authorized"})
  })
  

  app.get('/auth/doctorverify',doctorverifyUser(),(req,res)=>{
    return res.json({status: true,message:"authorized"})
  })


  app.post("/forgotpassworddoctor",async(req,res)=>{
      const {email} = req.body
    try {
      const doctoruser = await Doctorloginmodel.findOne({doctoremail:email})
      if (!doctoruser){
        return res.json({message:"User not Register"})
      }else{
        const emailtoken =  jwt.sign({id:doctoruser._id},process.env.JWTCODE,{expiresIn: '1d'})
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mdhospitalsmakeyousmile@gmail.com',
          pass: 'chkn bkfp ogcf njwp'
        }
        });
  
        var mailOptions = {
          from: 'mdhospitalsmakeyousmile@gmail.com',
          to: email, 
          subject: 'RESET PASSWORD !!!',
          text: `https://healchat.vercel.app/Resetpassword/${emailtoken}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            return res.json({message:"error at sending message"})
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.json({status: true , message:"Email send successfully"})
      }
    } catch (error) {
      console.log(error);
    }
  })




  app.post("/forgotpasswordpatient",async(req,res)=>{
    const {email} = req.body
  try {
    const patientuser = await Patientloginmodel.findOne({patientemail:email})
    if (!patientuser){
      return res.json({message:"User not Register"})
    }else{
      const emailtoken =  jwt.sign({id:patientuser._id},process.env.JWTCODE,{expiresIn: '15m'})
      var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mdhospitalsmakeyousmile@gmail.com',
        pass: 'chkn bkfp ogcf njwp'
      }
      });

      var mailOptions = {
        from: 'mdhospitalsmakeyousmile@gmail.com',
        to: email, 
        subject: 'RESET PASSWORD !!!',
        text: `https://healchat.vercel.app/Resetpasswordpatient/${emailtoken}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return res.json({message:"error at sending message"})
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.json({status: true , message:"Email send successfully"})
    }
  } catch (error) {
    console.log(error);
  }
})


app.post('/resetpassword/:doctortoken',async(req,res)=>{
  const {doctortoken} = req.params
  const {password} = req.body
  try {

    if (!doctortoken) {
      return res.json({ status: false, message: 'Token is missing' });
    }


    const decoded = await jwt.verify(doctortoken, process.env.JWTCODE);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password,10)
    await Doctorloginmodel.findByIdAndUpdate({_id:id},{doctorpassword : hashpassword})
    return res.json({status : true , message : "updated password"})
  } catch (error) {
    return res.json(error)
  }
})


app.post('/resetpasswordpatient/:patienttoken',async(req,res)=>{
  const {patienttoken} = req.params
  const {password} = req.body
  try {

    if (!patienttoken) {
      return res.json({ status: false, message: 'Token is missing' });
    }


    const decoded = await jwt.verify(patienttoken, process.env.JWTCODE);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password,10)
    await Patientloginmodel.findByIdAndUpdate({_id:id},{patientpassword : hashpassword})
    return res.json({status : true , message : "updated password"})
  } catch (error) {
    return res.json(error)
  }
})

app.get('/doctorprofile',async(req,res)=>{
  try {
    const doctortoken = await req.cookies.doctortoken
    const decoded = await jwt.verify(doctortoken, process.env.JWTCODE);
    req.user = decoded
    const doctoremail = await decoded.doctoremail;
    const doctoruser = await Doctorloginmodel.findOne({doctoremail:doctoremail})
    return res.json({doctoruser})

  } catch (error) {
    console.log(error);
  }
  
  
})


app.get('/patientprofile',async(req,res)=>{
  try {
    const patienttoken = await req.cookies.patienttoken
    const decoded = await jwt.verify(patienttoken, process.env.JWTCODE);
    req.user = decoded
    const patientemail = await decoded.patientemail;
    const patientuser = await Patientloginmodel.findOne({patientemail:patientemail})
    return res.json({patientuser})

  } catch (error) {
    console.log(error);
  }
  
  
})





app.get("/patientslist",async(req,res)=>{
  try {
    const patientlist = await Patientloginmodel.find()
    res.json(patientlist)
  } catch (error) {
    console.log(error);
  }
})

app.post("/assigndoctor",async(req,res)=>{
    try {
      const {patientid,doctorname,email} = req.body
      const patientupdate = await Patientloginmodel.findOneAndUpdate({patientid:patientid},{doctorassigned:doctorname,doctorassignedemail:email})
      if (patientupdate){
        return res.json({status : true , message : "assignedsuccessfully"})
      }else{
        res.status(404).json({ message: "Patient not found" });
      }
    } catch (error) {
      console.log(error);
    }
})

app.post("/yourpatients",async(req,res)=>{
  try {
    const {doctoremail} = req.body
    const patientsdata = await Patientloginmodel.find({doctorassignedemail:doctoremail})

    return res.json(patientsdata)
  } catch (error) {
    console.log(error);
    
  }
});


app.post("/getdoctorid",async(req,res)=>{
  try {
    const {senderemail} = req.body
    const doctordata = await Doctorloginmodel.find({doctoremail:senderemail})

    return res.json(doctordata)
  } catch (error) {
    console.log(error);
    
  }
})


app.post("/getpatientid",async(req,res)=>{
  try {
    const {patientloginid} = req.body
    const patientdata = await Patientloginmodel.find({patientid:patientloginid})

    return res.json(patientdata)
  } catch (error) {
    console.log(error);
    
  }
})


app.post('/getchats',async(req,res)=>{
  const {doctorid,patientid} = req.body
  try {
    const chat = await Chatmodel.findOne({doctorid,patientid})
    res.status(200).json(chat);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Server error' });
  }
  
})



const forchat = io.of("/chat");
const forcall = io.of("/call")


const socketmap = {};


forchat.on("connection",socket=>{
  
  socket.on("join",({userid,role})=>{
  
    socketmap[userid] = socket.id
  
  })


  socket.on("sendmessage",async({touserid,message,fromuserid,role})=>{
    const tosocketid = socketmap[touserid];
    if (tosocketid) {
      io.to(tosocketid).emit("receivemessage",message)
      
      

      try {
        const filter = {
          doctorid: role === "doctor" ? fromuserid : touserid,
          patientid: role === "patient" ? fromuserid : touserid
        }

        const update = {
          $push : {
            sendermessage : {text:message,role:role,timestamp: new Date()}
          }
        };

        await Chatmodel.findOneAndUpdate(filter, update, { upsert: true, new: true });

      } catch (error) {
        console.log(error);
        
      }


    }
  })


  socket.on("disconnect", () => {
    for (const userid in socketmap) {
      if (socketmap[userid] === socket.id) {
        delete socketmap[userid];
        break;
      }
    }
  });
  
})








app.post("/setimages",async(req,res)=>{
  try {
    const {imageurl,patientid} = req.body
  
    const patientimagesupdated = await Patientloginmodel.findOneAndUpdate({patientid:patientid},{$push:{patientimages:imageurl}},{ new: true }) 
    if(patientimagesupdated){
      return res.json({status: true,message:"image uploaded"})
    }else{
      res.status(404).json({message:"No image url found"})
    }
    
  } catch (error) {
    console.log(error);
    
  }
  
  
})


app.post("/deleteimage",async(req,res)=>{
  try {
    const {data,patientrealid} = req.body

    
    const deletedimage = await Patientloginmodel.findOneAndUpdate({patientid:patientrealid},{$pull:{patientimages:data}})

    

    if(deletedimage){
      return res.json({status :true,message:"image deleted"})
    }else{
      res.status(404).json({message:"No image url found"})
    }
    
    
  } catch (error) {
    console.log(error);
    
  }
})




server.listen(process.env.PORT ,()=>{
    console.log("server is running");
    
})
