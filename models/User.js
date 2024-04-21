import mongoose from "mongoose";

// Define the roles as an enum
const roles = ['admin','manager','staff','user'];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile : {type: String , required:true},
  role: { type: String, enum: roles, default: 'manager' },
  about : {type: String}
});

const User = mongoose.model('User', userSchema);

export default User;