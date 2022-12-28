const date = new Date()

export const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export const year= date.getFullYear() as string | number

export const period = {
  year: date.getFullYear(),
  month: months[date.getMonth()],  
}

export const wallet = {
  balance: 0,
  incomes: 0,
  expenses: 0
}
