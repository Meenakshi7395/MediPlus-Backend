import express from "express";
import validator from 'express-validator';
import { authicateJWT } from "../controllers/users.js";
const  { body } = validator;

const router = express.Router();

import { createIncident, deleteIncident, getAllIncidents, getIncidentById, updateIncidents } from "../controllers/incidents.js"


// Routes
router.get('/',authicateJWT, getAllIncidents);
router.post('/',authicateJWT, createIncident);
router.get('/:id',authicateJWT, getIncidentById);
router.patch('/:id',authicateJWT,updateIncidents);
router.delete('/:id',authicateJWT, deleteIncident);

export default router;