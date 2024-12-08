import db from '../db';

type PersistCashin = (
  valorTransacao: number,
  descricaoTransacao: string,
  dataCriacaoTransacao: Date,
  nomePortadorCartao: string,
  numeroCartao: string,
  validadeCartao: Date,
  codigoSegurancaCartao: string
) => Promise<number>;



type Rows = { id: number };

// ##################################### QUERIES ###############################
const SQLCashin = `INSERT INTO
  pagway.transacao (
    valor_transacao, 
    descricao_transacao, 
    data_criacao_transacao, 
    nome_portador_cartao,
    numero_cartao,
    validade_cartao,
    codigo_seguranca_cartao
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7
  )
  RETURNING id;
`;


const SQLPaginatedTransactionASC = `SELECT
  valor_transacao,
  descricao_transacao,
  data_criacao_transacao,
  nome_portador_cartao,
  numero_cartao,
  validade_cartao,
  codigo_seguranca_cartao
FROM
  pagway.transacao
ORDER BY
  transacao.id ASC
LIMIT
  $2
OFFSET
  $1
;`;
const SQLPaginatedTransactionDESC = `SELECT
  valor_transacao,
  descricao_transacao,
  data_criacao_transacao,
  nome_portador_cartao,
  numero_cartao,
  validade_cartao,
  codigo_seguranca_cartao
FROM
  pagway.transacao
ORDER BY
  transacao.id DESC
LIMIT
  $2
OFFSET
  $1
;`;



// ##################################### REPO METHODS ###############################
const persistCashin: PersistCashin = async (
  valorTransacao,
  descricaoTransacao,
  dataCriacaoTransacao,
  nomePortadorCartao,
  numeroCartao,
  validadeCartao,
  codigoSegurancaCartao
) => {
  const { rows } = await db.query<Rows>({
    name: 'SQLCashin',
    text: SQLCashin,
    values: [valorTransacao, descricaoTransacao, dataCriacaoTransacao, nomePortadorCartao, numeroCartao, validadeCartao, codigoSegurancaCartao],
  });

  return rows[0].id;
};


interface ReadPaginatedTransactionParam {
  offset: number;
  limit: number;
  order: 'ASC' | 'DESC';
}
interface TransactionElement {
  valorTransacao: number;
  descricaoTransacao: string;
  dataCriacaoTransacao: Date;
  nomePortadorCartao: string;
  numeroCartao: number;
  validadeCartao: string;
  codigoSegurancaSartao: string;
}
const readPaginatedTransaction = async ({ offset, limit, order }: ReadPaginatedTransactionParam): Promise<Array<TransactionElement>> => {
  console.dir({
    offset,
    limit,
    order,
  });

  let rows: Array<TransactionElement>;

  if (order === 'ASC') {
    const query = await db.query<TransactionElement>({
      name: 'SQLPaginatedTransactionASC',
      text: SQLPaginatedTransactionASC,
      values: [offset, limit],
    });
    rows = query.rows;
  } else {
    const query = await db.query<TransactionElement>({
      name: 'SQLPaginatedTransactionDESC',
      text: SQLPaginatedTransactionDESC,
      values: [offset, limit],
    });
    rows = query.rows;
  }
  console.log(rows);
  return rows;
};

export default {
  persistCashin,
  readPaginatedTransaction,
};
