import db from '../db';

const SQLEmailExists = `SELECT 
    id
  FROM 
    pagway.usuario
  WHERE email = $1;`;

const SQLMatchCred = `SELECT
    id 
  FROM pagway.usuario
  WHERE email = $1
    AND pass = $2;`;

const emailExists = async (email: string): Promise<number> => {
  const query = await db.query<{ id: number }>({
    name: 'SQLEmailExists',
    text: SQLEmailExists,
    values: [email]
  });
  const id = query.rows[0].id;
  return id;
}

const matchCred = async (email: string, pass: string): Promise<number> => {
  const query = await db.query<{ id: number }>({
    name: 'SQLMatchCred',
    text: SQLMatchCred,
    values: [email, pass]
  });
  const id = query.rows[0].id;
  return id;
}

export default {
  emailExists,
  matchCred
}