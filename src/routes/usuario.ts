import express from 'express';
import { autenticar, registrar } from '../controller/usuarioController';

const router = express.Router();

router.post('/registrar', registrar);
router.post('/', autenticar);

export default router;
