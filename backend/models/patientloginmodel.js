const mongoose = require('mongoose')

const patientloginscheema = new mongoose.Schema({
    patientname:String,
    patientemail:String,
    patientphoneno:Number,
    patientage:Number,
    patientweight:Number,
    patientheight:Number,
    patientbloodgroup:String,
    patientid:String,
    patientpassword:String,
    patientproblem:String,
    doctorassignedemail:String,
    doctorassigned: {
        type: String,
        default: "NOT ASSIGNED"
    },
    patientimages:{
        type : [String],
        default : []
    }


})

const Patientloginmodel = mongoose.model("patientdata",patientloginscheema)
module.exports = Patientloginmodel
