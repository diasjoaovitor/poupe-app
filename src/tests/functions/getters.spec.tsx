import { getWallet } from "../../shared/functions"
import { TTransaction, TTransactionType } from "../../shared/types"

const getTransactionsMock = (t: { type: TTransactionType, value: number }[]): TTransaction[] => {
  const transactions: TTransaction[] = t.map(({ type, value }) => ({
    category: 'category',
    date: 'date',
    description: 'description',
    period: 'period',
    ref: 'ref',
    type, value
  }))
  return transactions
}

describe('getWallet', () => {
  it('Positive balance', async () => {
    const transactions = getTransactionsMock([
      {
        type: 'Receita',
        value: 15
      },
      {
        type: 'Receita',
        value: 35
      },
      {
        type: 'Despesa',
        value: 7
      },
      {
        type: 'Despesa',
        value: 13
      }
    ])

    expect(getWallet(transactions)).toEqual({
      incomes: 50,
      expenses: 20,
      balance: 30
    })
  })

  it('Negative balance', async () => {
    const transactions = getTransactionsMock([
      {
        type: 'Receita',
        value: 4
      },
      {
        type: 'Receita',
        value: 6
      },
      {
        type: 'Despesa',
        value: 8
      },
      {
        type: 'Despesa',
        value: 4
      }
    ])

    expect(getWallet(transactions)).toEqual({
      incomes: 10,
      expenses: 12,
      balance: -2
    })
  })
})
