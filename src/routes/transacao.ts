import express from 'express';
import { inserirTransacao, recuperarTransacoes } from '../controller/transacaoController';

const router = express.Router();

// crete a single transaction
router.post('/', inserirTransacao);

// get a page of transactions
router.get('/', recuperarTransacoes);

/* router.get('/cuiabashoes/saldo', async (req, res) => {
  console.log(req.url, new Date());

  const disponivel = await model.totalLiquidado();
  const previsto = await model.totalPendente();

  res.status(200).json({
    saldo: {
      disponivel,
      previsto,
    },
  });
});
 */

export default router;
