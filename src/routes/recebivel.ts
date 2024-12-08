import express from 'express';
import { recuperarSaldo } from '../controller/recebivelController';
const router = express.Router();

router.get('/', recuperarSaldo);

export default router;
