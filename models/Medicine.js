import mongoose from "mongoose";

// Define the category as an enum
const category = ['one','two','three'];

const medicineSchema = new mongoose.Schema({
  name: { type: String, required:true },
  chemicalName : {type: String, required:true},
  category :{type:String, enum: category },
  description : {type: String },
  unitPrice : {type: Number},
  manufecture :{type:String}
});

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;