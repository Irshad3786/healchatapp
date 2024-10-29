const mongoose = require('mongoose')

const doctorloginscheema = new mongoose.Schema({
    doctorname:String,
    doctoremail:String,
    doctorphoneno:Number,
    medicallicienceno:String,
    doctorpassword:String,
    doctorspecialization:String,
})

const Doctorloginmodel = mongoose.model("doctordata",doctorloginscheema)
module.exports = Doctorloginmodel