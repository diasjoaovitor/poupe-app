import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { authConfig, db } from '../environment'
import { TTransaction } from '../types'

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
