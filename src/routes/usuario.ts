import express from 'express';
import { autenticar } from '../controller/usuarioController';

const router = express.Router();

router.post('/', autenticar);

export default router;
