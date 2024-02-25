import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { obtenerRoles, agregarRol, eliminarRol } from '../controllers/rolesController.js';

const router = express.Router();

router.route('/')
    .get(checkAuth,obtenerRoles)
    .post(checkAuth,agregarRol)

router.route('/:id')
    .delete(checkAuth,eliminarRol)
export default router;