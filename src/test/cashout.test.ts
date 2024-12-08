import { describe, expect, test } from 'vitest'
import mkCashout from '../service/recebivelService'

const dadosRecebivelOK = {
  transactionId: 1,
  dataCriacaoTransacao: new Date(),
  valorTransacao: 100_00
}
describe('BATERIA DE TESTES PARA O SERVIÇO DE CRIAÇÃO DE RECEBÍVEIS', () => {
  describe('setup da injeção de dependência', () => {
    test('o módulo mkCashout deve existir', () => {
      expect(mkCashout).toBeDefined()
    })
    test('o módulo mkCashout deve ser uma função', () => {
      const typeMkCashout = typeof mkCashout
      expect(typeMkCashout).toBe('function')
    })
    test('a função mkCashout deve retornar outra função', () => {
      const cashout = mkCashout({
        persistCashout: () => Promise.resolve()
      })
      const typeCashout = typeof cashout
      expect(typeCashout).toBe('function')
    })
  })
  describe('retorna os valores corretos', () => {
    test('cashout deve retornar sem erros', () => {
      const cashout = mkCashout({
        persistCashout: () => Promise.resolve()
      })

      expect(() => cashout(dadosRecebivelOK)).not.throws()
    })
  })
  describe('persiste os valores corretos', () => {
    test('transactionId deve ser o mesmo do argumento', async () => {
      const cashout = mkCashout({
        persistCashout: (transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel) => {
          expect(transactionId).toBe(dadosRecebivelOK.transactionId)

          return Promise.resolve()
        }
      })

      await cashout(dadosRecebivelOK)
    })
    test('statusRecebivel deve ser pendente', async () => {
      const cashout = mkCashout({
        persistCashout: (transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel) => {
          expect(statusRecebivel).toBe('pendente')

          return Promise.resolve()
        }
      })

      await cashout(dadosRecebivelOK)
    })
    test('dataPagamentoRecebivel deve ser 30 dias maior do argumento', async () => {
      const cashout = mkCashout({
        persistCashout: (transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel) => {
          const diff = dataPagamentoRecebivel.getTime() - dadosRecebivelOK.dataCriacaoTransacao.getTime()
          const dias = diff / 1000 / 60 / 60 / 24
          expect(dias).toBe(30)

          return Promise.resolve()
        }
      })

      await cashout(dadosRecebivelOK)
    })
    test('valorLiquidoRecebivel deve ser 5% menor do argumento', async () => {
      const cashout = mkCashout({
        persistCashout: (transactionId, statusRecebivel, dataPagamentoRecebivel, valorLiquidoRecebivel) => {
          const percent = (dadosRecebivelOK.valorTransacao - valorLiquidoRecebivel) / dadosRecebivelOK.valorTransacao
          expect(percent).toBe(0.05)

          return Promise.resolve()
        }
      })

      await cashout(dadosRecebivelOK)
    })
  })
})