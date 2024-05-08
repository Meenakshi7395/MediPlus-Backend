import express from "express";
import validator from 'express-validator';

const  { body } = validator;

const router = express.Router();

import { createOPD, deleteOPD, getAllOPDs, getOPDById, updateOPD } from "../controllers/OPDs.js"


// Routes
router.get('/', getAllOPDs);
router.post('/', createOPD);
router.get('/:id', getOPDById);
router.patch('/:id',updateOPD);
router.delete('/:id', deleteOPD);

export default router;