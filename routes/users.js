import express from "express";
import validator from 'express-validator';
import { authicateJWT, loginUser } from "../controllers/users.js";

const  { body } = validator;

const router = express.Router();

import { createUser,getAllUsers,getUserById,updateUser,deleteUser} from "../controllers/users.js"

// Routes
router.post('/login', loginUser);
router.get('/',authicateJWT, getAllUsers);
router.post('/', authicateJWT,createUser);
router.get('/:id',authicateJWT, getUserById);
router.patch('/:id',authicateJWT,updateUser);
router.delete('/:id',authicateJWT, deleteUser);

export default router;