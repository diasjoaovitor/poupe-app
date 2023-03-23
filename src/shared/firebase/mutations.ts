import { v4 as uuid } from 'uuid'
import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '../environment'
import { TTransaction, TYear, TYears } from '../types'

export const createTransaction = async (transaction: TTransaction) => {
  await addDoc(collection(db, 'transactions'), transaction)
}

export const createTransactions = async (transactions: TTransaction[]) => {
  const batch = writeBatch(db)
  transactions.forEach(transaction => {
    const ref = doc(db, 'transactions', uuid())
    batch.set(ref, transaction)
  })
  await batch.commit()
}

export const createYear = async ({ ref, year }: TYear) => {
  await addDoc(collection(db, 'years'), { ref, year })
}

export const createYears = async ({ ref, years }: TYears) => {
  const batch = writeBatch(db)
  years.forEach(year => {
    const docRef = doc(db, 'years', uuid())
    batch.set(docRef, { year, ref })
  })
  await batch.commit()
}

export const updateTransaction = async (transaction: TTransaction) => {
  await updateDoc(doc(db, 'transactions', transaction.id as string), transaction)
}

export const destroyTransaction = async (id: string) => {
  await deleteDoc(doc(db, 'transactions', id))
}

export const destroyTransactions = async (ids: string[]) => {
  const batch = writeBatch(db)
  ids.forEach(id => {
    const ref = doc(db, 'transactions', id)
    batch.delete(ref)
  })
  await batch.commit()
}
