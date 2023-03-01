import { months } from '../../states'
import { TTransaction } from '../../types'

export const formatCurrency = (value: number) => (
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
)

export const formatPresentationOfTransactions = (transactions: TTransaction[]) => {
  const allDates = transactions.map(({ date }) => date)
  const dates = Array.from(new Set(allDates))
  const presentation = dates.map(date => {
    const [ _, month, day ] = date.split('/') 
    const m = months[Number(month) - 1].slice(0, 3).toLocaleLowerCase()
    const filteredTransactions = transactions.filter(posting => posting.date === date)
    const total = filteredTransactions.reduce((count, { value, type }) => {
      return type === 'Despesa' ? count -= value : count += value
    }, 0)
    return {
      date: `${day}/${m}`,
      total,
      transactions: filteredTransactions
    }
  })
  return presentation
}

export const formatDate = (date: string) => {
    if (!date) return date
    const [ year, month, day ] = date.split('/') 
    return `${day}/${month}/${year}`
}
