interface DatalayerCashout {
  persistCashout: (transactionId: number, statusRecebivel: string, dataPagamentoRecebivel: Date, valorLiquidoRecebivel: number) => Promise<void>;
}

interface CashoutProps {
  dataCriacaoTransacao: Date;
  valorTransacao: number;
  transactionId: number;
}

const thirdyDaysMs = 30 * 24 * 60 * 60 * 1000;
const costRate = 0.95;

const mkCashout = (db: DatalayerCashout) => async (props: CashoutProps) => {
  const statusRecebivel = "pendente"; // 'liquidado'
  const dataPagamentoRecebivel = new Date(props.dataCriacaoTransacao.getTime() + thirdyDaysMs);
  const valorLiquidoRecebivel = Math.round(props.valorTransacao * costRate);

  await db.persistCashout(props.transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel);
};

export default mkCashout;
