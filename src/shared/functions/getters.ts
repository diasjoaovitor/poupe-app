import { LinearScale } from "@mui/icons-material"
import { FormEvent } from "react"
import { expenseCategories, incomeCategories } from "../states/categories"
import { TTransaction } from "../types"

export const getElementValues = (e: FormEvent<HTMLFormElement>, elements: string[]): string[] => (
  elements.map(elementName => {
    const element = e.currentTarget.elements.namedItem(elementName) as HTMLInputElement | null
    return element ? element.value : ''
  })
)

export const getErrorMessage = (error: string): string => {
  switch(error) {
    case 'auth/user-not-found':
      return 'Esse usuário não existe. Faça seu cadastro!'
    case 'auth/wrong-password':
      return 'Senha incorreta!'
      case 'auth/email-already-in-use':
      return 'Esse usuário já existe!'
    case 'auth/invalid-email':
      return 'Email inválido!'
    default:
      return 'Algo deu errado! Verifique sua conexão com a internet ou atualize a página.'
  }
}

export const getWallet = (transactions: TTransaction[]) => {
  const incomes = transactions.filter(({ type }) => type === 'Receita') 
  const expenses = transactions.filter(({ type }) => type === 'Despesa')
  const totalExpenses = expenses.reduce((count, { value }) => count += value, 0)
  const totalIncomes = incomes.reduce((count, { value }) => count += value, 0)
  const wallet = {
    expenses: totalExpenses,
    incomes: totalIncomes,
    balance: totalIncomes - totalExpenses
  }
  return wallet
}

export const getCategoryIcon = (category: string) => {
  const expense = expenseCategories.find(({ name }) => name === category)
  if (expense) return expense.icon

  const income = incomeCategories.find(({ name }) => name === category)
  if (income) return income.icon

  return LinearScale
}
