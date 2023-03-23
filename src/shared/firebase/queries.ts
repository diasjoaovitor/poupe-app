import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../environment'
import { TTransaction } from '../types'

export const getTransactionsByPeriod = async (userId: string, period: string): Promise<TTransaction[]> => {
  const q = query(
    collection(db, 'transactions'),
    where('ref', '==', userId),
    where('period', '==', period),
    orderBy('date', 'desc')
  )
  const { docs } = await getDocs(q)
  const transactions = docs.map(doc => ({ id: doc.id, ...doc.data() })) as TTransaction[]
  return transactions
}

export const getYears = async (userId: string): Promise<string[]> => {
  const q = query(
    collection(db, 'years'),
    where('ref', '==', userId),
    orderBy('year', 'desc')
  )
  const { docs } = await getDocs(q)
  const years = docs.map(doc => doc.data().year) as string[]
  return years
}

export const getRecurringTransactionIds = async (id: string) => {
  const q = query(
    collection(db, 'transactions'),
    where('id', '==', id),
    orderBy('installment', 'asc')
  )
  const { docs } = await getDocs(q)
  const ids = docs.map(doc => doc.id)
  return ids
} 
