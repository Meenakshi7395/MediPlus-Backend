import express from "express";
import validator from 'express-validator';
import { authicateJWT } from "../controllers/users.js";

const  { body } = validator;

const router = express.Router();

import { createOPD, deleteOPD, getAllOPDs, getOPDById, updateOPD } from "../controllers/OPDs.js"


// Routes
router.get('/',authicateJWT, getAllOPDs);
router.post('/',authicateJWT, createOPD);
router.get('/:id',authicateJWT, getOPDById);
router.patch('/:id', authicateJWT,updateOPD);
router.delete('/:id',authicateJWT, deleteOPD);

export default router;