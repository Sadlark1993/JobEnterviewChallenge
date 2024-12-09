import express from 'express';
import recebivelService from '../service/recebivelService';


const saldo = recebivelService.recuperarSaldo();
export const recuperarSaldo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    console.log(req.url, new Date());
    const idUsuario = req.body.idUsuario;
    res.status(200).json({
      saldo: await saldo(idUsuario),
    });
  } catch (error) {
    next(error);
  }
};
