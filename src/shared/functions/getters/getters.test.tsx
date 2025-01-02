import { getDistinctYears, getPeriod, getWallet } from '..'
import { TTransaction, TTransactionType } from '../../types'

const getTransactionsMock = (
  t: { type: TTransactionType; value: number }[]
): TTransaction[] => {
  const transactions: TTransaction[] = t.map(({ type, value }) => ({
    category: 'category',
    date: 'date',
    description: 'description',
    period: 'period',
    ref: 'ref',
    type,
    value
  }))
  return transactions
}

describe('getWallet', () => {
  it('Positive balance', () => {
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

  it('Negative balance', () => {
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

describe('getDistinctYears', () => {
  it('Distinct and inversely ordered years', () => {
    const years = [2020, 2023, '2020', 2021, '2019', '2023', 2020, 2022]
    const expectedResult = [2023, 2022, 2021, 2020, 2019]

    expect(getDistinctYears(years)).toEqual(expectedResult)
  })
})

describe('getPeriod', () => {
  it('Get period by date', () => {
    expect(getPeriod('2023/01/28')).toEqual('Janeiro/2023')
    expect(getPeriod('2023-01-28')).toEqual('Janeiro/2023')
  })
})
