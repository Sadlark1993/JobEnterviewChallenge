import recebivelRepository from "../repository/recebivelRepository";

interface CashoutProps {
  dataCriacaoTransacao: Date;
  valorTransacao: number;
  transactionId: number;
}

const thirdyDaysMs = 30 * 24 * 60 * 60 * 1000;
const costRate = 0.95;

const mkCashout = ({ persistCashout } = recebivelRepository) => async (props: CashoutProps) => {
  const statusRecebivel = "pendente"; // 'liquidado'
  const dataPagamentoRecebivel = new Date(props.dataCriacaoTransacao.getTime() + thirdyDaysMs);
  const valorLiquidoRecebivel = Math.round(props.valorTransacao * costRate);

  await persistCashout(props.transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel);
};

const recuperarSaldo = ({ recuperarSaldo } = recebivelRepository) => async () => {
  let cliente = Math.ceil(Math.random() * 5);
  const disponivel = await recuperarSaldo('liquidado', cliente);
  const previsto = await recuperarSaldo('pendente', cliente);
  return { disponivel, previsto, cliente }
}

export default { mkCashout, recuperarSaldo };
