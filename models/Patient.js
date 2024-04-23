import mongoose from "mongoose";

// Define the gender as an enum
const gender = ['male','female'];

const patientSchema = new mongoose.Schema({
  name: { type: String, required:true },
  age : {type: Number},
  gender :{type:String,  enum: gender },
  mobile : {type: Number },
  address : {type: String},
  careTaker :{type:String}
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;