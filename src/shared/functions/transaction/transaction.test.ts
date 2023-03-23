import { addRecurrence } from '..'
import { TRecurrence, TTransaction } from '../../types'

const transaction: TTransaction = {
  ref: '',
  period: 'Janeiro/2023',
  type: 'Despesa',
  category: 'Outros',
  description: '',
  value: 0,
  date: '2023/01/25'
}

describe("addRecurrence", () => {
  it("YEARLY", () => {
    const recurrence = { frequency: "YEARLY", take: 3 } as TRecurrence
    const transactions = addRecurrence(transaction, recurrence)
    const expected: TTransaction[] = [
      {
        ...transaction,
        installment: '1/3',
        recurrence
      },
      {
        ...transaction,
        period: 'Janeiro/2024',
        date: '2024/01/25',
        installment: '2/3',
        recurrence
      },
      {
        ...transaction,
        period: 'Janeiro/2025',
        date: '2025/01/25',
        installment: '3/3',
        recurrence
      }
    ]
    expect(transactions).toEqual(expected)
  })

  it("MONTHLY", () => {
    const recurrence = { frequency: "MONTHLY", take: 3 } as TRecurrence
    const transactions = addRecurrence(transaction, recurrence)
    const expected: TTransaction[] = [
      {
        ...transaction,
        installment: '1/3',
        recurrence
      },
      {
        ...transaction,
        period: 'Fevereiro/2023',
        date: '2023/02/25',
        installment: '2/3',
        recurrence
      },
      {
        ...transaction,
        period: 'Março/2023',
        date: '2023/03/25',
        installment: '3/3',
        recurrence
      }
    ]
    expect(transactions).toEqual(expected)
  })

  it("WEEKLY", () => {
    const recurrence = { frequency: "WEEKLY", take: 3 } as TRecurrence
    const transactions = addRecurrence(transaction, recurrence)
    const expected: TTransaction[] = [
      {
        ...transaction,
        installment: '1/3',
        recurrence
      },
      {
        ...transaction,
        period: 'Fevereiro/2023',
        date: '2023/02/01',
        installment: '2/3',
        recurrence
      },
      {
        ...transaction,
        period: 'Fevereiro/2023',
        date: '2023/02/08',
        installment: '3/3',
        recurrence
      }
    ]
    expect(transactions).toEqual(expected)
  })
})