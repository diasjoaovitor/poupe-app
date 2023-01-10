import { fireEvent, render, screen  } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { Dashboard } from "../../pages"
import { ThemeProvider } from "../../shared/contexts"
import { useDashboard } from "../../shared/hooks"
import { TTransaction } from "../../shared/types"

jest.mock('../../shared/hooks/useDashboard')

const mockedUseDashboard = useDashboard as jest.Mock<any> 

const client = new QueryClient()

const routeSetup = () => {
  const router = createMemoryRouter(
    [
      { path: '/', element: <Dashboard /> }
    ],
    {
      initialEntries: ['/']
    }
  )

  render(
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
  
  return { router }
}

const mockSetup = (args: any) => {
  mockedUseDashboard.mockImplementation(() => ({
    period: {
      month: 'Janeiro',
      year: 2023
    },
    years: [2022, 2023],
    isLoading: false,
    transactions: [
      {
        category: 'Esporte',
        date: '2023/01/06',
        description: 'Uma transação',
        period: 'Janeiro/2023',
        ref: 'ref',
        type: 'Despesa',
        value: 50
      },
      {
        category: 'Salário',
        date: '2023/01/07',
        description: 'Outra transação',
        period: 'Janeiro/2023',
        ref: 'ref',
        type: 'Receita',
        value: 100
      }
    ] as TTransaction[],
    ...args
  }))
}

describe('<Dashboard />', () => {
  it('Exception message', () => {
    const errorMessage = 'Algo deu Errado'
    mockSetup({
      message: errorMessage
    })
    routeSetup()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('All Transactions', () => {
    const handleTransactionClick = jest.fn()
    mockSetup({
      handleTransactionClick
    })
    routeSetup()

    const transaction = screen.getByText('Uma transação')
    const transaction2 = screen.getByText('Outra transação')

    fireEvent.click(transaction)
    expect(handleTransactionClick).toHaveBeenCalled()

    fireEvent.click(transaction2)
    expect(handleTransactionClick).toHaveBeenCalled()
  })

  it('One Transaction', () => {
    const handleUpdate = jest.fn()
    const handleDelete = jest.fn()
    mockSetup(({
      handleUpdate,
      handleDelete,
      transaction: {
        category: 'Esporte',
        date: '2023/01/06',
        description: 'Uma transação',
        period: 'Janeiro/2023',
        ref: 'ref',
        type: 'Despesa',
        value: 50
      }
    }))
    routeSetup()

    const update = screen.getByText('Editar')
    const del = screen.getByText('Excluir')
    
    fireEvent.click(update)
    expect(handleUpdate).toHaveBeenCalled()

    fireEvent.click(del)
    expect(handleDelete).toHaveBeenCalled()
  })
}) 
