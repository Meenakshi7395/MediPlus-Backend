import OPD from "../models/OPD.js";
import Incident from "../models/Incident.js";

// add OPD
export const createOPD = async (req, res) => {
    try {
      console.log(req.body)
      const newOPD = new OPD(req.body);

      // read the incident
      const incident = await Incident.findById(req.body.incident)
      
      // update parameters of opd
      newOPD.chiefComplaint = incident.chiefComplaint
      newOPD.diagnosis = incident.diagnosis

      await newOPD.save();

       // Add the ObjectId of the newly created OPD to the incidents's incidents array
      await Incident.findByIdAndUpdate(req.body.incident, { $push: { OPDs: newOPD._id } });

      
      res.json({"success":true,"message":"OPD Added", OPD:newOPD});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Get all OPDS
  export const getAllOPDs = async (req, res) => {
    try {
      const OPDs = await OPD.find().populate('incident');  // each opd will be populated with the details of incident
      res.json({"success":true,"message":"OPDs Data Found", OPDs:OPDs});
    } catch (error) {
      res.json({"success":false, "message": error.message });
    }
  };

// Get a single opd by ID
  export const getOPDById = async (req, res) => {
    try {
      const opd = await OPD.findById(req.params.id).populate({
        path: 'incident', // Populate the incident field
        populate: {
          path: 'patient', // Populate the patient field within incident
          model: 'Patient' // Reference to Patient model
        }
      })
      if (!opd) {
        return res.json({ "success":false,"message" : 'OPD not found' });
      }
      res.json({"success":true,"message":"OPD's Data Found",opd:opd});
    } catch (error) {
      res.json({"success":false, "message": error.message,errors:[] });
    }
  };
  
  // Update a opd by ID
  export const updateOPD = async (req, res) => {
    try {
    const opd = await OPD.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(opd);
      if (!opd) {
        return res.json({ message: 'OPD not found' });
      }
      res.json({"success":true,"message":"OPD's Data Found", OPDs:opd});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Delete a incident by ID
  export const deleteOPD = async (req, res) => {
    try {
      const opd = await OPD.findByIdAndDelete(req.params.id);
      if (!opd) {
        return res.json({ message: 'OPD not found' });
      }
      res.json({"success":true,"message":"OPD's record deleted successfully",OPDs:opd});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  