import db from '../db';

type RegisterUser = (
  username: string,
  email: string,
  pass: string,
  cliente: number | null,
  autoridade: string
) => Promise<number>;

const SQLRegisterUser = `INSERT INTO 
  pagway.usuario(
    username,
    email,
    pass,
    cliente,
    autoridade
  ) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5
  )
  RETURNING id;`;

const SQLEmailExists = `SELECT 
    id
  FROM 
    pagway.usuario
  WHERE email = $1;`;

const SQLMatchCred = `SELECT
    id, pass, autoridade
  FROM pagway.usuario
  WHERE email = $1;`;

const registerUser: RegisterUser = async (username, email, pass, cliente, autoridade) => {
  const query = await db.query<{ id: number }>({
    name: 'SQLRegisterUser',
    text: SQLRegisterUser,
    values: [username, email, pass, cliente, autoridade]
  });
  return query.rows[0].id;
}

const emailExists = async (email: string): Promise<number | boolean> => {
  const query = await db.query<{ id: number }>({
    name: 'SQLEmailExists',
    text: SQLEmailExists,
    values: [email]
  });

  if (query.rowCount === 0) {
    return false;
  }
  const id = query.rows[0].id;
  return id;
}

const matchCred = async (email: string): Promise<{ id: number | boolean, pass: string, autoridade: string }> => {
  const query = await db.query<{ id: number, pass: string, autoridade: string }>({
    name: 'SQLMatchCred',
    text: SQLMatchCred,
    values: [email]
  });

  if (query.rowCount === 0) {
    return { id: false, pass: '', autoridade: '' };
  }

  const cred = query.rows[0];
  return cred;
}

export default {
  registerUser,
  emailExists,
  matchCred
}