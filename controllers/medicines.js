import Medicine from "../models/Medicine.js";

// add a new medicine
export const createMedicine = async (req, res) => {
    try {
      console.log(req.body)
      const newMedicine = new Medicine(req.body);
      await newMedicine.save();
      // console.log(newMedicine)
      res.json({"success":true,"message":"Medicine Added", medicine:newMedicine});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Get all medicines
  export const getAllMedicines = async (req, res) => {
    try {
      const medicines = await Medicine.find();
      res.json({"success":true,"message":"Medicines Data Found", medicines:medicines});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message });
    }
  };

// Get a single medicine by ID
  export const getMedicineById = async (req, res) => {
    // console.log("hello")
    try {
      const medicine = await Medicine.findById(req.params.id);
      if (!medicine) {
        return res.status(404).json({ "success":false,"message" : 'Medicine not found' });
      }
      res.json({"success":true,"message":"Medicine's Data Found",medicine:medicine});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message,errors:[] });
    }
  };
  
  // Update a medicine by ID
  export const updateMedicines = async (req, res) => {
    // console.log("hello edit")
    // console.log(req.body);
    try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(medicine);
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.json({"success":true,"message":"Medicine's Data Found",medicines:medicine});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Delete a medicine by ID
  export const deleteMedicine = async (req, res) => {
    try {
      const medicine = await Medicine.findByIdAndDelete(req.params.id);
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.json({"success":true,"message":"Medicine's record deleted successfully",medicines:medicine});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message, errors:[]});
    }
  };
  