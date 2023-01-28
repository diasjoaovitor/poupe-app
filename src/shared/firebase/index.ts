import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where, writeBatch } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { authConfig, db } from '../environment'
import { TTransaction, TYear, TYears } from '../types'

export const login = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(authConfig, email, password)
} 

export const register = async (email: string, password: string): Promise<void> => {
  const res = await createUserWithEmailAndPassword(authConfig, email, password)
  await addDoc(collection(db, 'users'), { user: res.user.uid })
} 

export const logout = async (): Promise<void> => {
  await authConfig.signOut()
} 

export const create = async (transaction: TTransaction): Promise<void> => {
  await addDoc(collection(db, 'transactions'), transaction)
}

export const createDocs = async (transactions: TTransaction[]): Promise<void> => {
  const batch = writeBatch(db)
  transactions.forEach(transaction => {
    const ref = doc(db, 'transactions', uuid())
    batch.set(ref, transaction)
  })
  await batch.commit()
}

export const read = async (userId: string, period: string): Promise<TTransaction[]> => {
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

export const createYear = async ({ ref, year }: TYear): Promise<void> => {
  await addDoc(collection(db, 'years'), { ref, year })
}

export const createYears = async ({ ref, years }: TYears): Promise<void> => {
  const batch = writeBatch(db)
  years.forEach(year => {
    const ref = doc(db, 'years', uuid())
    batch.set(ref, { year, ref })
  })
  await batch.commit()
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

export const getRecurringTransactions = async (userId: string, recorrencyRef: string): Promise<TTransaction[]> => {
  const q = query(
    collection(db, 'transactions'),
    where('ref', '==', userId),
    where('recorrencyRef', '==', recorrencyRef)
  )
  const { docs } = await getDocs(q)
  const transactions = docs.map(doc => ({ id: doc.id, ...doc.data() })) as TTransaction[]
  return transactions
} 

export const update = async (transaction: TTransaction): Promise<void> => {
  await updateDoc(doc(db, 'transactions', transaction.id as string), transaction)
}

export const updateDocs = async (transactions: TTransaction[]): Promise<void> => {
  const batch = writeBatch(db)
  transactions.forEach(transaction => {
    const ref = doc(db, 'transactions', transaction.id as string)
    batch.update(ref, transaction)
  })
  await batch.commit()
}

export const destroy = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'transactions', id))
}
