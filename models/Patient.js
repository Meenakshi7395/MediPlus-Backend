import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age : {type: String,required:true},
  gender :{type:String, required:true},
  mobile : {type: String , required:true},
  address : {type: String, required:true},
  careTaker :{type:String, required:true}
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;