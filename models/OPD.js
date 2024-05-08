import mongoose from "mongoose";
const Schema = mongoose.Schema;

const status = ['New','Active','Hold','Closed'];

const OPDSchema = new mongoose.Schema({
  incident: { type: Schema.Types.ObjectId, ref: 'Incident' },   /// Each OPD hasOne Incident
  date : {type:String, required:true},
  doctor:{type:String},
  temp: {type:Number},
  bp: {type:Number},
  sugar:{type:Number},
  pulse:{type:Number},
  status :{type:String,enum:status},
  diagnosis : {type: String },
  chiefComplaint :{type:String},
  advice:{type:String},
  allergy:{type:String},
  fees:{type:String},
  bill:{type:String},
  
});

const OPD = mongoose.model('OPD', OPDSchema);

export default OPD;