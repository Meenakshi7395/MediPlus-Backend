import express from "express";
import validator from 'express-validator';

const  { body } = validator;

const router = express.Router();

import { createPrescription, deletePrescription, getAllPrescription, getPrescriptionById, updatePrescription } from "../controllers/prescription.js";


// Routes
router.get('/', getAllPrescription);
router.post('/', createPrescription);
router.get('/:id', getPrescriptionById);
router.patch('/:id',updatePrescription);
router.delete('/:id', deletePrescription);

export default router;