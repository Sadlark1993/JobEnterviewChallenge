import express from 'express';
import { recuperarSaldo } from '../controller/recebivelController';
import { verifyToken } from '../middleware/jwtAuth';


const router = express.Router();

router.get('/', verifyToken, recuperarSaldo);

export default router;
