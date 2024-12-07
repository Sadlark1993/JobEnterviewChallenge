import express from 'express';
import model from '../model';
import mkcashin from '../service/cashin';
import mkcashout from '../service/cashout';

const cashin = mkcashin(model);
const cashout = mkcashout(model);
const onlyNumber = /^\d+$/;

// @desc Create a single transaction
// @route POST /api/transacao
export const inserirTransacao = async (req: express.Request, res: express.Response) => {
  console.log(req.url, new Date());
  const { valor, descricao, nomePortadorCartao, numeroCartao, validadeCartao, codigoSegurancaCartao } = req.body;

  /**
   * VALIDATE INPUTS
   */
  const valorOK = typeof valor === 'number' && Number.isFinite(valor) && valor > 0 && valor % 1 === 0;
  const descricaoOK = typeof descricao === 'string' && descricao.length > 0 && descricao.length < 1024;
  const nomePortadorCartaoOK = typeof nomePortadorCartao === 'string' && nomePortadorCartao.length > 0 && nomePortadorCartao.length < 1024;
  const numeroCartaoOK = typeof numeroCartao === 'string' && numeroCartao.length === 16 && onlyNumber.test(numeroCartao);
  const validadeCartaoDate = new Date(validadeCartao);
  const validadeCartaoOK = new Date(validadeCartaoDate).getTime() > Date.now(); // NaN > now === false
  const codigoSegurancaCartaoOK = typeof codigoSegurancaCartao === 'string' && codigoSegurancaCartao.length === 3 && onlyNumber.test(codigoSegurancaCartao);
  const allOK = valorOK && descricaoOK && nomePortadorCartaoOK && numeroCartaoOK && validadeCartaoOK && codigoSegurancaCartaoOK;

  if (!allOK) {
    res.status(400).send({
      error: true,
      message: 'invalid input',
    });
    console.error(req.body);

    return; // throw
  }

  const { transactionId, dataCriacaoTransacao } = await cashin({
    codigoSegurancaCartao,
    descricao,
    nomePortadorCartao,
    numeroCartao,
    validadeCartao,
    valor,
  });

  res.status(200).json({
    ok: true,
  });

  await cashout({
    dataCriacaoTransacao,
    transactionId,
    valorTransacao: valor,
  });
};

// @desc Get all transactions paginated, with the page and the size of the page defined by the user in the query
// @route GET /api/transacao
export const recuperarTransacoes = async (req: express.Request, res: express.Response) => {
  console.log(req.url, new Date());
  const { page = '1', size = '20', order = 'asc' } = req.query;

  /**
   * DEFAULT PAGINATION
   */
  const pageInt = Number.parseInt(String(page));
  const pageValid = !Number.isFinite(pageInt) || Number.isNaN(pageInt) || pageInt < 1 ? 1 : pageInt;
  //
  const sizeInt = Number.parseInt(String(size));
  const sizeValid = Number.isNaN(sizeInt) || sizeInt < 1 ? 1 : sizeInt;
  const sizeCrop = sizeValid > 200 ? 200 : sizeValid;
  //
  const orderDesc = order === 'desc';

  const transactionList = await model.readPaginatedTransaction({
    limit: sizeCrop,
    offset: sizeCrop * (pageValid - 1),
    order: orderDesc ? 'DESC' : 'ASC',
  });

  res.status(200).json(transactionList);
};
