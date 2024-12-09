import express from 'express';
import recebivelService from '../service/recebivelService';


const saldo = recebivelService.recuperarSaldo();
export const recuperarSaldo = async (req: express.Request, res: express.Response) => {
  console.log(req.url, new Date());

  res.status(200).json({
    saldo: await saldo(),
  });
};
