import { Rule } from '../../environment'
import { TRecurrence, TTransaction } from '../../types'
import { formatZero, getPeriod } from '..'

export const addRecurrence = (transaction: TTransaction, recurrence: TRecurrence, recurrenceRef: string): TTransaction[] => {
  const { frequency, take } = recurrence
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
      recurrenceRef,
      recurrence
    }
  })
  return transactions
}
