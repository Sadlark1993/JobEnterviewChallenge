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

const SQLSumRecebivel = `SELECT
  SUM(valor_liquido_recebivel)
FROM
  pagway.recebivel
WHERE
  status_recebivel = $1
;`;


const persistCashout: PersistCashout = async (transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel) => {
  await db.query({
    name: 'SQLCashout',
    text: SQLCashout,
    values: [transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel],
  });
};


const recuperarSaldo = async (status: 'liquidado' | 'pendente') => {
  const query = await db.query<{ sum: number }>({
    name: 'SQLSumRecebivel',
    text: SQLSumRecebivel,
    values: [status],
  });
  const total = query.rows[0].sum;

  return total;
}


export default {
  persistCashout,
  recuperarSaldo
};