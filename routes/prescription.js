import express from "express";
import validator from 'express-validator';
import { authicateJWT } from "../controllers/users.js";

const  { body } = validator;

const router = express.Router();

import { createPrescription, deletePrescription, getAllPrescription, getPrescriptionById, updatePrescription } from "../controllers/prescription.js";


// Routes
router.get('/',authicateJWT, getAllPrescription);
router.post('/',authicateJWT, createPrescription);
router.get('/:id',authicateJWT, getPrescriptionById);
router.patch('/:id',authicateJWT,updatePrescription);
router.delete('/:id',authicateJWT, deletePrescription);

export default router;