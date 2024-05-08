import Incident from "../models/Incident.js";
import Patient from "../models/Patient.js";

// add a new incident
export const createIncident = async (req, res) => {
    try {
      console.log(req.body)
      const newIncident = new Incident(req.body);
      await newIncident.save();

       // Add the ObjectId of the newly created Incident to the Patient's incidents array
      await Patient.findByIdAndUpdate(req.body.patient, { $push: { incidents: newIncident._id } });


      res.json({"success":true,"message":"Incident Added", incident:newIncident});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Get all Incidents
  export const getAllIncidents = async (req, res) => {
    try {
      const incidents = await Incident.find().populate('patient');  // each incident will be populated with the details of patient
      res.json({"success":true,"message":"Incidents Data Found", incidents:incidents});
    } catch (error) {
      res.json({"success":false, "message": error.message });
    }
  };

// Get a single incident by ID
  export const getIncidentById = async (req, res) => {
    // console.log("hello")
    try {
      const incident = await Incident.findById(req.params.id).populate('patient').populate('OPDs');;
      if (!incident) {
        return res.json({ "success":false,"message" : 'Incident not found' });
      }
      res.json({"success":true,"message":"Incident's Data Found",incident:incident});
    } catch (error) {
      res.json({"success":false, "message": error.message,errors:[] });
    }
  };
  
  // Update a incident by ID
  export const updateIncidents = async (req, res) => {
    try {
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(incident);
      if (!incident) {
        return res.json({ message: 'Incident not found' });
      }
      res.json({"success":true,"message":"Incident's Data Found", incidents:incident});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Delete a incident by ID
  export const deleteIncident = async (req, res) => {
    try {
      const incident = await Incident.findByIdAndDelete(req.params.id);
      if (!incident) {
        return res.json({ message: 'Incident not found' });
      }
      res.json({"success":true,"message":"Incident's record deleted successfully",incidents:incident});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  