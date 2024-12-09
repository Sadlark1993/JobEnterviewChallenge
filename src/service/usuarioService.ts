import usuarioRepository from "../repository/usuarioRepository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;

interface UserProps {
  username: string,
  email: string,
  pass: string,
  cliente: number,
  autoridade: 'USER' | 'ADMIN'
}

const register = ({ registerUser } = usuarioRepository) => async (props: UserProps) => {
  const hash = await bcrypt.hash(props.pass, saltRounds);
  const id = await registerUser(props.username, props.email, hash, props.cliente, props.autoridade);
  return {
    result: true,
    msg: 'Usuário cadastrado com sucesso!',
    id: id
  }
}

const auth = ({ emailExists, matchCred } = usuarioRepository) => async (email: string, pass: string) => {
  /*  const checkEmail = await emailExists(email);
   console.log('check email: ' + checkEmail);
   if (!checkEmail) {
     return {
       result: false,
       msg: "Email não encontrado no sistema"
     };
   } */

  const cred = await matchCred(email);
  console.log('check cred: ' + cred.id + ' ' + cred.pass + ' ' + cred.autoridade);
  if (!cred.id) {
    return {
      result: false,
      msg: "Email não encontrado no sistema"
    };
  }

  const result = await bcrypt.compare(pass, cred.pass);
  if (!result) {
    return {
      result: false,
      msg: 'Senha incorreta'
    }
  }

  const token = jwt.sign(
    { email: email, id: cred.id, authority: cred.autoridade },
    "SECRET_KEY",
    { expiresIn: "5h" }
  );

  return {
    result: true,
    msg: 'Usuário autenticado com sucesso',
    email: email,
    autoridade: cred.autoridade,
    token: token
  };
}

export default {
  register,
  auth
}