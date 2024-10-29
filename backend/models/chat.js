// const mongoose = require('mongoose')

// const doctorloginscheema = new mongoose.Schema({
//     doctorname:String,
//     doctoremail:String,
//     doctorphoneno:Number,
//     medicallicienceno:String,
//     doctorpassword:String,
//     doctorspecialization:String,
// })

// const Doctorloginmodel = mongoose.model("doctordata",doctorloginscheema)
// module.exports = Doctorloginmodel


const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    text: String,
    role: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  });

const chatingschema = new mongoose.Schema({
    doctorid: { type: String, required: true },
    patientid: { type: String, required: true },
    sendermessage: [messageSchema]
})

const Chatmodel = mongoose.model("chatdata",chatingschema)
module.exports = Chatmodel