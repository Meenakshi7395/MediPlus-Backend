import express from "express";
import validator from 'express-validator';

const  { body } = validator;

const router = express.Router();

import { createMedicine, deleteMedicine, getAllMedicines, getMedicineById, updateMedicines } from "../controllers/medicines.js"


// Routes
router.get('/', getAllMedicines);
router.post('/', createMedicine);
router.get('/:id', getMedicineById);
router.patch('/:id',updateMedicines);
router.delete('/:id', deleteMedicine);

export default router;