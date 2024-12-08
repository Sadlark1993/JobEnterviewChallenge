import express from 'express';
import model from '../repository/transacaoRepository';

export const recuperarSaldo = async (req: express.Request, res: express.Response) => {
  console.log(req.url, new Date());

  const disponivel = await model.totalLiquidado();
  const previsto = await model.totalPendente();

  res.status(200).json({
    saldo: {
      disponivel,
      previsto,
    },
  });
};
