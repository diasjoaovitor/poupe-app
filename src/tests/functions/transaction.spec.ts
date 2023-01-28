import { addRecorrency } from "../../shared/functions"
import { TRecorrency, TTransaction } from "../../shared/types"

const transaction: TTransaction = {
  ref: '',
  period: 'Janeiro/2023',
  type: 'Despesa',
  category: 'Outros',
  description: '',
  value: 0,
  date: '2023/01/25'
}

const recorrencyRef = '123'

describe("addRecorrency", () => {
  it("YEARLY", () => {
    const recorrency = { frequency: "YEARLY", take: 3 } as TRecorrency
    const transactions = addRecorrency(transaction, recorrency, recorrencyRef)
    const expected: TTransaction[] = [
      {
        ...transaction,
        installment: '1/3',
        recorrencyRef,
        recorrency
      },
      {
        ...transaction,
        period: 'Janeiro/2024',
        date: '2024/01/25',
        installment: '2/3',
        recorrencyRef,
        recorrency
      },
      {
        ...transaction,
        period: 'Janeiro/2025',
        date: '2025/01/25',
        installment: '3/3',
        recorrencyRef,
        recorrency
      }
    ]
    expect(transactions).toEqual(expected)
  })

  it("MONTHLY", () => {
    const recorrency = { frequency: "MONTHLY", take: 3 } as TRecorrency
    const transactions = addRecorrency(transaction, recorrency, recorrencyRef)
    const expected: TTransaction[] = [
      {
        ...transaction,
        installment: '1/3',
        recorrencyRef,
        recorrency
      },
      {
        ...transaction,
        period: 'Fevereiro/2023',
        date: '2023/02/25',
        installment: '2/3',
        recorrencyRef,
        recorrency
      },
      {
        ...transaction,
        period: 'Março/2023',
        date: '2023/03/25',
        installment: '3/3',
        recorrencyRef,
        recorrency
      }
    ]
    expect(transactions).toEqual(expected)
  })

  it("WEEKLY", () => {
    const recorrency = { frequency: "WEEKLY", take: 3 } as TRecorrency
    const transactions = addRecorrency(transaction, recorrency, recorrencyRef)
    const expected: TTransaction[] = [
      {
        ...transaction,
        installment: '1/3',
        recorrencyRef,
        recorrency
      },
      {
        ...transaction,
        period: 'Fevereiro/2023',
        date: '2023/02/01',
        installment: '2/3',
        recorrencyRef,
        recorrency
      },
      {
        ...transaction,
        period: 'Fevereiro/2023',
        date: '2023/02/08',
        installment: '3/3',
        recorrencyRef,
        recorrency
      }
    ]
    expect(transactions).toEqual(expected)
  })
})