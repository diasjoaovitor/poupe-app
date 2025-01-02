import { v4 as uuid } from 'uuid'
import {
  addRecurrence,
  getDistinctYears,
  getYear
} from '../../shared/functions'
import { TRecurrence, TTransaction } from '../../shared/types'
import * as firebase from '../../shared/firebase'

export const createTransaction = async (transaction: TTransaction) => {
  const { ref, date } = transaction
  const year = getYear(date)
  await firebase.createTransaction(transaction)
  await firebase.createYear({ ref, year })
}

export const createTransactions = async (
  transaction: TTransaction,
  recurrence: TRecurrence
) => {
  const { ref } = transaction
  const transactions = addRecurrence(transaction, recurrence, uuid())
  await firebase.createTransactions(transactions)
  const years = getDistinctYears(transactions.map(({ date }) => getYear(date)))
  await firebase.createYears({ years, ref })
}

export const updateTransaction = async (transaction: TTransaction) => {
  const { ref, date } = transaction
  const year = getYear(date)
  await firebase.updateTransaction(transaction)
  await firebase.createYear({ ref, year })
}

export const updateTransactionAndAddRecurrence = async (
  transaction: TTransaction,
  recurrence: TRecurrence
) => {
  await firebase.destroyTransaction(transaction.id as string)
  await createTransactions(transaction, recurrence)
  return
}

export const updateTransactions = async (
  transaction: TTransaction,
  recurrence: TRecurrence
) => {
  const { ids, date } = await firebase.getRecurringTransactions(
    transaction.recurrenceRef as string
  )
  await firebase.destroyTransactions(ids)
  await createTransactions({ ...transaction, date }, recurrence)
}
