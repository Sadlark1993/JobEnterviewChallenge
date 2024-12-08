import model from '../repository/transacaoRepository';

interface CashinProps {
  valor: number;
  descricao: string;
  nomePortadorCartao: string;
  numeroCartao: string;
  validadeCartao: Date;
  codigoSegurancaCartao: string;
}

/**
 * FAKE SERVICES
 */
const checkValidCard = (props: CashinProps) => Promise.resolve();
const antifraud = (props: CashinProps) => Promise.resolve();
const mastercadApi = (props: CashinProps) => Promise.resolve();

/**
 *  Factory function that returns another function that does the following:
 *  After perform some validations, it will call the repo function persistCashin
 * that will persist the transation in the database using models.persistCashin.
 */
const mkCashin = ({ persistCashin } = model) => async (props: CashinProps) => {
  await checkValidCard(props);
  await antifraud(props);
  await mastercadApi(props);

  const ultimos4Cartao = props.numeroCartao.slice(-4);
  const dataCriacaoTransacao = new Date();
  const cliente = Math.ceil(Math.random() * 5);

  const transactionId = await persistCashin(
    props.valor,
    props.descricao,
    dataCriacaoTransacao,
    props.nomePortadorCartao,
    ultimos4Cartao,
    props.validadeCartao,
    props.codigoSegurancaCartao,
    cliente
  );

  return {
    dataCriacaoTransacao,
    transactionId,
  };
};

const recuperarTransacoes = async (pageInt: number, sizeInt: number, orderDesc: boolean) => {
  const pageValid = !Number.isFinite(pageInt) || Number.isNaN(pageInt) || pageInt < 1 ? 1 : pageInt;
  //
  const sizeValid = Number.isNaN(sizeInt) || sizeInt < 1 ? 1 : sizeInt;
  const sizeCrop = sizeValid > 200 ? 200 : sizeValid;
  //

  const transactionList = await model.readPaginatedTransaction({
    limit: sizeCrop,
    offset: sizeCrop * (pageValid - 1),
    order: orderDesc ? 'DESC' : 'ASC',
    client: Math.ceil(Math.random() * 5)
  });

  return transactionList;
}

export default { mkCashin, recuperarTransacoes };
