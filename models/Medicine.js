import mongoose from "mongoose";

// Define the category as an enum
const category = ['Tablet','Capsule','Injection','Syrup','Drop','Ointmet'];

const medicineSchema = new mongoose.Schema({
  brandName: { type: String, required:true },
  chemicalName : {type: String, required:true},
  category :{type:String, enum: category },
  description : {type: String },
  unitPrice : {type: Number},
  manufecturer :{type:String}
});

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;