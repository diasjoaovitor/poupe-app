import { render, screen } from "@testing-library/react"
import { Transactions, Props } from "../../shared/components"

const a = {
  period: 'period',
  ref: 'ref'
}

const transactionsPropsMock: Props = {
  transactions: [
    {
      date: '2023/01/13',
      description: 'One',
      category: 'Transporte',
      type: 'Despesa',
      value: 10,
      ...a
    },
    {
      date: '2023/01/13',
      description: 'Two',
      category: 'Salário',
      type: 'Receita',
      value: 20,
      ...a
    },
    {
      date: '2023/01/14',
      description: 'Three',
      category: 'Esporte',
      type: 'Despesa',
      value: 10,
      ...a
    },
    {
      date: '2023/01/14',
      description: 'Four',
      category: 'Não existe',
      type: 'Despesa',
      value: 20,
      ...a
    }
  ],
  color: {
    red: 'red',
    blue: 'blue'
  },
  handleClick: jest.fn()  
}

const setup = (props: Props) => {
  const { container } = render(
    <Transactions {...props}  />
  )

  return container
}

const getDays = (container: HTMLElement) => {
  const days = Array.from(container.querySelectorAll('h2'))
  return days
}

describe('<Transactions />', () => {
  it('Expense and income color rendering', () => {
    setup(transactionsPropsMock)
    const listItems = screen.getAllByRole('listitem')
    const [ expense, income ] = listItems

    expect(expense).toHaveStyle('background-color: red')
    expect(income).toHaveStyle('background-color: blue')
  })

  it('Number of days', () => {
    const container = setup(transactionsPropsMock)
    const days = getDays(container)

    expect(days).toHaveLength(2)
  })

  it('Day Balance', () => {
    const container = setup(transactionsPropsMock)
    const days = getDays(container)
    const [ day1, day2 ] = days

    expect(day1.textContent).toBe('13/jan + R$ 10,00')
    expect(day2.textContent).toBe('14/jan - R$ 30,00')
  })

  it('Correct Icon rendering', () => {
    setup(transactionsPropsMock)
    const listItems = screen.getAllByRole('listitem')
    const [ transporte, salario, esporte, naoExiste ] = listItems.map(li => li.querySelector('svg'))

    expect(screen.getByTestId('DriveEtaIcon')).toBe(transporte)
    expect(screen.getByTestId('LocalAtmIcon')).toBe(salario)
    expect(screen.getByTestId('FitnessCenterIcon')).toBe(esporte)
    expect(screen.getByTestId('LinearScaleIcon')).toBe(naoExiste)
  })
})
