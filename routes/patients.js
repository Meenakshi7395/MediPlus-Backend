import express from "express";
import validator from 'express-validator';
import { authicateJWT } from "../controllers/users.js";

const  { body } = validator;

const router = express.Router();

import { createPatient, deletePatient, getAllPatients, getPatientById, updatePatient} from "../controllers/patients.js"

// Routes
router.get('/',authicateJWT, getAllPatients);
router.post('/',authicateJWT, createPatient);
router.get('/:id',authicateJWT, getPatientById);
router.patch('/:id',authicateJWT,updatePatient);
router.delete('/:id',authicateJWT, deletePatient);

export default router;