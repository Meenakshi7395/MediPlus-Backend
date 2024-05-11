import OPD from "../models/OPD.js";
import Prescription from "../models/Prescription.js";

// add prescription
export const createPrescription = async (req, res) => {
    try {
      console.log(req.body)
      const newPrescription = new Prescription(req.body);

      await newPrescription.save()

       // Add the ObjectId of the newly created prescriptions to the prescriptions's prescription array
      await OPD.findByIdAndUpdate(req.body.opd, { $push: { prescriptions: newPrescription._id } });

      //read the newPrescription and populate the medicine in that
      const prescription = await Prescription.findById(newPrescription._id).populate('medicine'); 

      res.json({"success":true,"message":"Prescription Added", prescription:prescription});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Get all Prescription
  export const getAllPrescription = async (req, res) => {
    try {
      const prescription = await Prescription.find().populate('opd');  // each prescription will be populated with the details of opd
      res.json({"success":true,"message":"Prescriptions Data Found", Prescriptions:prescription});
    } catch (error) {
      res.json({"success":false, "message": error.message });
    }
  };

// Get a single prescription by ID
  export const getPrescriptionById = async (req, res) => {
    try {
      const prescription = await Prescription.findById(req.params.id).populate('opd').populate('medicine')
      if (!prescription) {
        return res.json({ "success":false,"message" : 'Prescription not found' });
      }
      res.json({"success":true,"message":"Prescription's Data Found",prescription:prescription});
    } catch (error) {
      res.json({"success":false, "message": error.message,errors:[] });
    }
  };
  
  // Update a prescription by ID
  export const updatePrescription = async (req, res) => {
    try {
    const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(prescription);
      if (!prescription) {
        return res.json({ message: 'Prescription not found' });
      }
      res.json({"success":true,"message":"Prescription's Data updated", prescriptions:prescription});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Delete a incident by ID
  export const deletePrescription = async (req, res) => {
    try {
      const prescription = await Prescription.findByIdAndDelete(req.params.id);
      if (!prescription) {
        return res.json({ message: 'Prescription not found' });
      }
      res.json({"success":true,"message":"Prescription's record deleted successfully",prescription:prescription});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  