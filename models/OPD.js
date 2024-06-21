import mongoose from "mongoose";
import Prescriptions from "../models/Prescription.js";
const Schema = mongoose.Schema;

const status = ['New','Active','Hold','Closed'];

const OPDSchema = new mongoose.Schema({
  incident: { type: Schema.Types.ObjectId, ref: 'Incident' },   /// Each OPD hasOne Incident
  date : {type:String, required:true},
  doctor:{type:String},
  temp: {type:Number,default:0},
  bp: {type:Number,default:0},
  sugar:{type:Number,default:0},
  pulse:{type:Number,default:0},
  status :{type:String,enum:status},
  diagnosis : {type: String },
  chiefComplaint :{type:String},
  advice:{type:String,default:""},
  allergy:{type:String,default:""},
  fees:{type:String},
  bill:{type:String},
  prescriptions: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }]
} );

const OPD = mongoose.model('OPD', OPDSchema);

export default OPD;