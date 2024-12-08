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

const recuperarSaldo = async () => {
  const disponivel = await recebivelRepository.recuperarSaldo('liquidado');
  const previsto = await recebivelRepository.recuperarSaldo('pendente');
  return { disponivel, previsto }
}

export default { mkCashout, recuperarSaldo };
