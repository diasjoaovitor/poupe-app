export type TAuthService = (email: string, password: string) => Promise<void>

export type TMUIColor = 'error' | 'primary'

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
}

export type TYear = {
  ref: string
  year: number | string
}

export type TYears = {
  ref: string
  years: (number | string)[]
}

export type TPeriod = {
  month: string
  year: string | number
}

export type TAppData = {
  period: TPeriod
  years: (string | number)[]
  transactions: TTransaction[]
  transaction: TTransaction | undefined
}
