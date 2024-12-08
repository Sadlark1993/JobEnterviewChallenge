import express from 'express';
import { inserirTransacao, recuperarTransacoes } from '../controller/transacaoController';

const router = express.Router();

// crete a single transaction
router.post('/', inserirTransacao);

// get a page of transactions
router.get('/', recuperarTransacoes);

export default router;
