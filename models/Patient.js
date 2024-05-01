import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the gender as an enum
const gender = ['male','female'];

const patientSchema = new mongoose.Schema({
  name: { type: String, required:true },
  age : {type: Number},
  gender :{type:String,  enum: gender },
  mobile : {type: Number },
  address : {type: String},
  careTaker :{type:String},

  // Add a field to store references to related incidents
  incidents: [{ type: Schema.Types.ObjectId, ref: 'Incident' }], /// A Patient hasMany Incidents
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;