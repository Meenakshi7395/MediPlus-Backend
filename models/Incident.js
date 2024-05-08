import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the patient as an enum
const status = ['Open','Closed','Hold'];

const incidentSchema = new mongoose.Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },   /// Each Incident hasOne Patient
  date : {type:String, required:true},
  chiefComplaint :{type:String},
  diagnosis : {type: String },
  doctor : {type:String},
  status :{type:String,enum:status},
  
  OPDs: [{ type: Schema.Types.ObjectId, ref: 'OPD' }],
});

const Incident = mongoose.model('Incident', incidentSchema);

export default Incident;