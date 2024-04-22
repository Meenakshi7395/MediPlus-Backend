import express from "express";
import validator from 'express-validator';

const  { body } = validator;

const router = express.Router();

import { createPatient, deletePatient, getAllPatients, getPatientById, updatePatient} from "../controllers/patients.js"

// Routes
router.get('/', getAllPatients);
router.post('/', createPatient);
router.get('/:id', getPatientById);
router.patch('/:id',updatePatient);
router.delete('/:id', deletePatient);

export default router;