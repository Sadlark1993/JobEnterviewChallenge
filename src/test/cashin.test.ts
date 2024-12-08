import { describe, expect, test } from 'vitest'
import transacaoService from '../service/transacaoService'

const dadosTrasaçãoOK = {
  codigoSegurancaCartao: '123',
  descricao: 'smartband',
  nomePortadorCartao: 'fulano',
  numeroCartao: '1234123412345678',
  validadeCartao: new Date(Date.now() + 24 * 60 * 60 * 1000),
  valor: 100_00
}

describe('BATERIA DE TESTES PARA O SERVIÇO DE CRIAÇÃO DE NOVAS TRANSAÇÕES', () => {
  describe('setup da injeção de dependência', () => {
    test('o módulo mkCashin deve existir', () => {
      expect(transacaoService.mkCashin).toBeDefined()
    })
    test('o módulo mkCashin deve ser uma função', () => {
      const typeMkCashin = typeof transacaoService.mkCashin
      expect(typeMkCashin).toBe('function')
    })
    test('a função mkCashin deve retornar outra função', () => {
      const cashin = transacaoService.mkCashin()
      const typeCashin = typeof cashin
      expect(typeCashin).toBe('function')
    })
    test('a função retornada deve responder com o id mockado', async () => {
      const transactionInMocked = 1
      const cashin = transacaoService.mkCashin()

      const sut = await cashin(dadosTrasaçãoOK)

      expect(sut.transactionId).toBe(transactionInMocked)
    })
  })
  describe('retorna os valores corretos', () => {
    test('data de criação da transação deve ser atual', async () => {
      const cashin = transacaoService.mkCashin()

      const sut = await cashin(dadosTrasaçãoOK)

      const agora = Date.now()
      const lowDelta = Math.abs(agora - sut.dataCriacaoTransacao.getTime()) < 100

      expect(lowDelta).toBe(true)
    })
  })
  describe('persiste os valores corretos', () => {
    test('apenas os últimos 4 digitos devem ser salvos', async () => {
      const cashin = transacaoService.mkCashin()

      const sut = await cashin(dadosTrasaçãoOK);
    })
    test('a data de criação da transação persistida deve ser recente', async () => {
      const cashin = transacaoService.mkCashin();

      const sut = await cashin(dadosTrasaçãoOK);
    })
    test('o valor da transação persistido deve ser o mesmo do argumento', async () => {
      const cashin = transacaoService.mkCashin();

      const sut = await cashin(dadosTrasaçãoOK)
    })
    test('a descrição da transação persistida deve ser a mesma do argumento', async () => {
      const cashin = transacaoService.mkCashin()

      const sut = await cashin(dadosTrasaçãoOK)
    })
    test('o nome do portador da transação persistido deve ser o mesmo do argumento', async () => {
      const cashin = transacaoService.mkCashin()

      const sut = await cashin(dadosTrasaçãoOK)
    })
    test('a validade do cartão persistida deve ser a mesma do argumento', async () => {
      const cashin = transacaoService.mkCashin()

      const sut = await cashin(dadosTrasaçãoOK)
    })
    test('o código de segurança do cartao persistido deve ser o mesmo do argumento', async () => {
      const cashin = transacaoService.mkCashin()

      const sut = await cashin(dadosTrasaçãoOK)
    })
  })
})
