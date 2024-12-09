import { error } from 'console';
import model from '../repository/transacaoRepository';
import usuarioRepository from '../repository/usuarioRepository';
import CustomError from '../util/CustomError';


interface CashinProps {
  valor: number;
  descricao: string;
  nomePortadorCartao: string;
  numeroCartao: string;
  validadeCartao: Date;
  codigoSegurancaCartao: string;
  idUsuario: number
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
  const cliente = await usuarioRepository.getCliente(props.idUsuario);

  if (!cliente) {
    const error = new CustomError('É necessário especificar o cliente.');
    error.status = 400;
    throw error;
  }

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
    result: true,
    dataCriacaoTransacao,
    transactionId,
  };
};

const recuperarTransacoes = async (pageInt: number, sizeInt: number, orderDesc: boolean, idUsuario: number | null) => {
  const pageValid = !Number.isFinite(pageInt) || Number.isNaN(pageInt) || pageInt < 1 ? 1 : pageInt;
  //
  const sizeValid = Number.isNaN(sizeInt) || sizeInt < 1 ? 1 : sizeInt;
  const sizeCrop = sizeValid > 200 ? 200 : sizeValid;
  //

  const client = idUsuario ? await usuarioRepository.getCliente(idUsuario) : null;
  const transactionList = await model.readPaginatedTransaction({
    limit: sizeCrop,
    offset: sizeCrop * (pageValid - 1),
    order: orderDesc ? 'DESC' : 'ASC',
    client: client
  });

  return transactionList;
}

export default { mkCashin, recuperarTransacoes };
