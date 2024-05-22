import express from "express";
import validator from 'express-validator';
import { authicateJWT } from "../controllers/users.js";

const  { body } = validator;

const router = express.Router();

import { createMedicine, deleteMedicine, getAllMedicines, getMedicineById, updateMedicines } from "../controllers/medicines.js"


// Routes
router.get('/',authicateJWT, getAllMedicines);
router.post('/',authicateJWT, createMedicine);
router.get('/:id',authicateJWT, getMedicineById);
router.patch('/:id',authicateJWT,updateMedicines);
router.delete('/:id',authicateJWT, deleteMedicine);

export default router;