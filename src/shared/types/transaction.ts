export type TTransactionType = 'Despesa' | 'Receita'

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
}
