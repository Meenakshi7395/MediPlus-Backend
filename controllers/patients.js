import Patient from "../models/Patient.js";

// add a new patient
export const createPatient = async (req, res) => {
    try {
      console.log(req.body)
      const newPatient = new Patient(req.body);
      await newPatient.save();
      // res.status(201).json({"success":true,"message":"Patients Created",patient:newPatient});
      console.log(newPatient)
      res.json({"success":true,"message":"Patient Added",patient:newPatient});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Get all patients
  export const getAllPatients = async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json({"success":true,"message":"Patients Data Found",patients:patients});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message });
    }
  };

// Get a single patient by ID
  export const getPatientById = async (req, res) => {
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
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json({"success":true,"message":"Patient's record deleted successfully",patients:patient});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message, errors:[]});
    }
  };
  