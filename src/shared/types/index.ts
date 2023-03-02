export type TAuthService = (email: string, password: string) => Promise<void>

export type TMUIColor = 'error' | 'primary'

export type TWallet = {
  balance: number
  incomes: number
  expenses: number
}

export type TTransactionType = 'Despesa' | 'Receita'

export type TRecurrence = {
  frequency: 'YEARLY' | 'WEEKLY' | 'MONTHLY'
  take: number
}

export type TTransaction = {
  id?: string
  timestamp?: string
  ref: string 
  period: string
  type: TTransactionType
  category: string
  description: string
  value: number
  date: string
  recurrence?: TRecurrence
  installment?: string
  recurrenceRef?: string
}

export type TYear = {
  ref: string
  year: number | string
}

export type TYears = {
  ref: string
  years: (number | string)[]
}

export type TAppData = {
  period: {
    month: string
    year: string | number
  }
  years: (string | number)[]
  wallet: TWallet
  transactions: TTransaction[]
  transaction: TTransaction | undefined
}
