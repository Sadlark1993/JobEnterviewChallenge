import express from 'express';
import usuarioService from '../service/usuarioService';

const registerService = usuarioService.register();
const authService = usuarioService.auth();

export const registrar = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    console.log(req.url, new Date());
    const { username, email, senha, cliente, autoridade } = req.body;
    const result = await registerService({ username, email, pass: senha, cliente, autoridade });
    if (result.result) {
      return res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
}

export const autenticar = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    console.log(req.url, new Date());
    const { email, senha } = req.body;
    const authResult = await authService(email, senha);
    if (authResult.result) {
      return res.status(200).json({
        msg: 'usuario autenticado com sucesso',
        email: authResult.email,
        autoridade: authResult.autoridade,
        token: authResult.token
      });
    }
    res.status(401).json(authResult);
  } catch (error) {
    next(error);
  }
}