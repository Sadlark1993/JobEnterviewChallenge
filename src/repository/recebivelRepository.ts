import db from '../db';

type PersistCashout = (
  transactionId: number,
  statusRecebivel: string,
  dataPagamentoRecebivel: Date,
  valorLiquidoRecebivel: number
) => Promise<void>;

const SQLCashout = `INSERT INTO
pagway.recebivel (
  transacao_id,
  status_recebivel,
  data_pagamento_recebivel,
  valor_liquido_recebivel
)
VALUES (
  $1,
  $2,
  $3,
  $4
);`;

const getSumRecebivel = (client: number | null) => {
  let innerTrans = '';
  let clientFilter = '';
  if (client) {
    innerTrans = 'INNER JOIN pagway.transacao b ON a.transacao_id = b.id';
    clientFilter = 'AND b.cliente = $2';
  }
  const query = `SELECT
    SUM(valor_liquido_recebivel)
  FROM
    pagway.recebivel a
  ${innerTrans}
  WHERE
    a.status_recebivel = $1
    ${clientFilter}
  ;`;
  return query;
}



const persistCashout: PersistCashout = async (transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel) => {
  await db.query({
    name: 'SQLCashout',
    text: SQLCashout,
    values: [transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel],
  });
};


const recuperarSaldo = async (status: 'liquidado' | 'pendente', client: number | null): Promise<number> => {
  const queryName = 'SQLSumRecebivel' + (client ? 'Client' : '');
  const values: Array<'liquidado' | 'pendente' | number | null> = [status];
  if (client) {
    values.push(client);
  }
  const query = await db.query<{ sum: number }>({
    name: queryName,
    text: getSumRecebivel(client),
    values: values,
  });
  const total = query.rows[0].sum;

  return total;
}


export default {
  persistCashout,
  recuperarSaldo
};