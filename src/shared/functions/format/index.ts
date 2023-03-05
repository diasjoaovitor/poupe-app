import { months } from '../../states'
import { TTransaction } from '../../types'

export const formatZero = (n: number) => n > 0 && n < 10 ? `0${n}` : n

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
    const d = new Date(date)
    const month = d.getMonth() + 1
    const day = d.getDate()
    const m = months[Number(month) - 1].slice(0, 3).toLocaleLowerCase()
    const filteredTransactions = transactions.filter(posting => posting.date === date)
    const total = filteredTransactions.reduce((count, { value, type }) => {
      return type === 'Despesa' ? count -= value : count += value
    }, 0)
    return {
      date: `${formatZero(day)}/${m}`,
      total,
      transactions: filteredTransactions
    }
  })
  return presentation
}

export const formatDate = (date: string) => {
  const d = new Date(date)
  const day = formatZero(d.getDate())
  const month = formatZero(d.getMonth() + 1)
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}
