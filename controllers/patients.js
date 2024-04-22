import User from "../models/Patient.js";
import jwt from 'jsonwebtoken';

// add a new patient
export const createPatient = async (req, res) => {
    try {
      console.log(req.body)
      const newPatient = new Patient(req.body);
      await newPatient.save();
      console.log(newPatient)
      res.json({"success":true,"message":"Patient Added",patient:newPatient});
    } catch (error) {
      res.json({"success":false, "message": error.message });
    }
  };
  
  // Get all patients
  export const getAllPatients = async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json({"success":true,"message":"Patient's Data Found",patients:patients});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message });
    }
  };

// Get a single patient by ID
  export const getUserById = async (req, res) => {
    // console.log("hello")
    try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) {
        return res.status(404).json({ "success":false,"message" : 'Patient not found' });
      }
      res.json({"success":true,"message":"Patient's Data Found",patients:patient});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message,errors:[] });
    }
  };
  
  // Update a patient by ID
  export const updatePatient = async (req, res) => {
    console.log("hello edit")
    console.log(req.body);
    try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(patient);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json({"success":true,"message":"Patient's Data Found",patients:patient});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Delete a Patient by ID
  export const deletePatient = async (req, res) => {
    try {
      const patient = await Patient.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json({"success":true,"message":"Patient deleted successfully",patients:patient});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  const accessTokenSecrete = "thisismyveryOwnSecreee";

  export const loginPatient = async (req, res) => {
    try {
      const {email,password} = req.body;
      const patient = await Patient.find({email:email,password:password});
      if (!patient) {
       return res.json({ message: 'Patients Not found' });
      }
      
      const accessToken = jwt.sign({id:patient._id,role:patient.role}, accessTokenSecrete);
    res.json({accessToken});

    } catch (error) {
      res.sendStatus(500);
      //.json({ "message": error.message })
    }
  };

export const authicateJWT = async (req,res,next) =>{
    const authheader = req.headers.authorization;
    console.log(authheader)
    if(authheader){
        const token = authheader.split(' ')[1];
        jwt.verify(token,accessTokenSecrete, (err, user) =>{
            if(err){
                return res.sendStatus(403) /// unauth
            }
            req.user = user;            /// in any request id and role of the user will be accessible 
            next();
        })
    }else{
        res.sendStatus(401)
    } 
} 
