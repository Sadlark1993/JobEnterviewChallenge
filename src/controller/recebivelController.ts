import express from 'express';
import recebivelService from '../service/recebivelService';

export const recuperarSaldo = async (req: express.Request, res: express.Response) => {
  console.log(req.url, new Date());

  const saldo = await recebivelService.recuperarSaldo()

  res.status(200).json({
    saldo: saldo,
  });
};
