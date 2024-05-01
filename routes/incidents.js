import express from "express";
import validator from 'express-validator';

const  { body } = validator;

const router = express.Router();

import { createIncident, deleteIncident, getAllIncidents, getIncidentById, updateIncidents } from "../controllers/incidents.js"


// Routes
router.get('/', getAllIncidents);
router.post('/', createIncident);
router.get('/:id', getIncidentById);
router.patch('/:id',updateIncidents);
router.delete('/:id', deleteIncident);

export default router;