import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { authConfig, db } from '../environment'

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
