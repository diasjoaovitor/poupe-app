import { Rule } from '../environment'
import { TRecorrency, TTransaction } from "../types"
import { getPeriod } from './getters'

export const formatZero = (n: number) => n < 10 ? `0${n}` : n

export const addRecorrency = (transaction: TTransaction, recorrency: TRecorrency, recorrencyRef: string): TTransaction[] => {
  const { frequency, take } = recorrency
  const { date } = transaction

  const rule = new Rule({
    frequency,
    start: new Date(date),
  })
  
  const transactions = rule.occurrences({ take }).toArray().map(({ date: d }, index) => {
    const date = `${d.getFullYear()}/${formatZero(d.getMonth() + 1)}/${formatZero(d.getDate())}`
    return {
      ...transaction,
      date,
      period: getPeriod(date),
      installment: `${index + 1}/${take}`,
      recorrencyRef,
      recorrency
    }
  })
  return transactions
}
