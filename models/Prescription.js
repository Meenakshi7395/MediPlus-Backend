import mongoose from "mongoose";
const Schema = mongoose.Schema;

const prescriptionSchema = new mongoose.Schema({
  opd : { type: Schema.Types.ObjectId, ref: 'OPD',required:true  },  // Prescription has one OPD
  medicine : {type: Schema.Types.ObjectId, ref: 'Medicine',required:true},
  dosage : {type:String},
  duration : {type:Number}, 

  
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription ;