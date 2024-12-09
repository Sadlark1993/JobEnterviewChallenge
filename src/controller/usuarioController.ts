import express from 'express';

export const autenticar = async (req: express.Request, res: express.Response) => {
  console.log(req.url, new Date());
  const { email, senha } = req.body;
  const authResult = { result: true, email: email, token: 'token' }; //service.auth(email, senha);
  if (authResult.result) {
    return res.status(200).json({
      msg: 'usuario autenticado com sucesso',
      email: authResult.email,
      token: authResult.token
    });
  }

  res.status(401).json(authResult);
}