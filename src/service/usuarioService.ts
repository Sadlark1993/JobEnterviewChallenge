import usuarioRepository from "../repository/usuarioRepository";
import jwt from 'jsonwebtoken';

const auth = ({ emailExists, matchCred } = usuarioRepository) => async (email: string, pass: string) => {
  const checkEmail = emailExists(email);
  if (!checkEmail) {
    return {
      result: false,
      msg: "Email não encontrado no sistema"
    };
  }

  const checkCred = matchCred(email, pass);
  if (!checkCred) {
    return {
      result: false,
      msg: "Senha incorreta"
    };
  }

  const token = jwt.sign(
    { email: email, id: checkCred, authority: 'user' },
    "SECRET_KEY",
    { expiresIn: "5h" }
  );

  return {
    result: true,
    msg: 'Usuário autenticado com sucesso',
    email: email,
    token: token
  };
}

export default {
  auth
}