import db from '../db';

type PersistCashin = (
  valorTransacao: number,
  descricaoTransacao: string,
  dataCriacaoTransacao: Date,
  nomePortadorCartao: string,
  numeroCartao: string,
  validadeCartao: Date,
  codigoSegurancaCartao: string,
  cliente: number
) => Promise<number>;

// ##################################### QUERIES ###############################
const SQLCashin = `INSERT INTO
  pagway.transacao (
    valor_transacao, 
    descricao_transacao, 
    data_criacao_transacao, 
    nome_portador_cartao,
    numero_cartao,
    validade_cartao,
    codigo_seguranca_cartao,
    cliente
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
  )
  RETURNING id;
`;

const selectTransactions = (client: number | null, order: 'DESC' | 'ASC') => {
  const clientFilter = client ? 'WHERE transacao.cliente = $3' : '';
  const query = `SELECT
    valor_transacao,
    descricao_transacao,
    data_criacao_transacao,
    nome_portador_cartao,
    numero_cartao,
    validade_cartao,
    codigo_seguranca_cartao
  FROM pagway.transacao
  ${clientFilter}
  ORDER BY transacao.id ${order}
  LIMIT $2
  OFFSET $1 ;`

  return query;
}

type Rows = { id: number };

// ##################################### REPO METHODS ###############################
const persistCashin: PersistCashin = async (
  valorTransacao,
  descricaoTransacao,
  dataCriacaoTransacao,
  nomePortadorCartao,
  numeroCartao,
  validadeCartao,
  codigoSegurancaCartao,
  cliente
) => {
  const { rows } = await db.query<Rows>({
    name: 'SQLCashin',
    text: SQLCashin,
    values: [valorTransacao, descricaoTransacao, dataCriacaoTransacao, nomePortadorCartao, numeroCartao, validadeCartao, codigoSegurancaCartao, cliente],
  });

  return rows[0].id;
};


interface ReadPaginatedTransactionParam {
  client: number | null;
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
const readPaginatedTransaction = async ({ client, offset, limit, order }: ReadPaginatedTransactionParam): Promise<Array<TransactionElement>> => {


  let rows: Array<TransactionElement>;

  //const hasClient = !!client;
  const queryName = `SQLPaginatedTransaction${order}` + (client ? 'Client' : '');
  const values = [offset, limit];
  if (client) {
    values.push(client);
  }

  console.dir({
    client,
    offset,
    limit,
    order,
    queryName
  });
  const query = await db.query<TransactionElement>({
    name: queryName,
    text: selectTransactions(client, order),
    values: values,
  });
  rows = query.rows;

  //console.log(rows);
  return rows;
};

export default {
  persistCashin,
  readPaginatedTransaction,
};
