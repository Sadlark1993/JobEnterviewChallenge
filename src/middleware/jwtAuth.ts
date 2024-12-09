import jwt from "jsonwebtoken";
import express from "express";

const SECRET_KEY = "SECRET_KEY";

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "Token de autorização não encontrado no cabeçalho." });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: 'Token inválido ou expirado.' });
    }

    const payload = decoded as { email: string, id: string, authority: string };
    req.body.autoridade = payload.authority;
    req.body.idUsuario = payload.id;
    next();
  });
}

export { verifyToken };