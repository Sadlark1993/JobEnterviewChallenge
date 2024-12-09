import express from 'express';
import { inserirTransacao, recuperarTransacoes } from '../controller/transacaoController';
import { verifyToken } from '../middleware/jwtAuth';

const router = express.Router();

// crete a single transaction
router.post('/', verifyToken, inserirTransacao);

// get a page of transactions
router.get('/', verifyToken, recuperarTransacoes);

export default router;
