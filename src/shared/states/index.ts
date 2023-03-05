import { TAppData, TTransaction } from "../types"

const formatZero = (n: number) => n > 0 && n < 10 ? `0${n}` : n

const date = new Date()

export const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export const year = date.getFullYear() as string | number

export const defaultAppState: TAppData = {
  period: {
    year: date.getFullYear(),
    month: months[date.getMonth()],  
  },
  years: [year],
  wallet: {
    balance: 0,
    incomes: 0,
    expenses: 0
  },
  transactions: [] as TTransaction[],
  transaction: undefined
}

export const transaction: TTransaction = {
  ref: '',
  period: '',
  type: 'Despesa',
  category: 'Outros',
  description: '',
  value: 0,
  date: `${date.getFullYear()}/${formatZero(date.getMonth() + 1)}/${formatZero(date.getDate())}`
}
