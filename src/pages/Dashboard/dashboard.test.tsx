import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { Dashboard } from '..'
import { AppBar } from '../../shared/components'
import { AppProvider, ThemeProvider } from '../../shared/contexts'
import { TTransaction } from '../../shared/types'
import { getErrorMessage } from '../../shared/functions'
import { useDashboardQuery } from './useDashboardQuery'

jest.mock('./useDashboardQuery')

const mockedUseDashboardQuery = useDashboardQuery as jest.Mock<any>

const client = new QueryClient()

const routeSetup = () => {
  const router = createMemoryRouter(
    [
      { path: '/', element: <Dashboard /> },
      { path: '/submit/:method', element: <AppBar md={true} page="AppBar" color="primary" />}
    ],
    {
      initialEntries: ['/']
    }
  )

  render(
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
  
  return router
}

const mockSetup = () => {
  mockedUseDashboardQuery.mockImplementation(() => ({
    isLoading: false,
    error: null,
    refetch: jest.fn(),
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
    years: [ 2022, 2023, 2023, 2021 ]
  }))
}

const mockErrorSetup = () => {
  mockedUseDashboardQuery.mockImplementation(() => ({
    isLoading: false,
    error: true,
    refetch: jest.fn(),
    transactions: [],
    years: [ 2023 ]
  }))
}

const openModal = (description: string) => {
  const transaction = screen.getByText(description)
  fireEvent.click(transaction)
}

const closeModal = () => {
  const modal = screen.getByTestId('transaction')
  const close = modal.querySelector('button') as HTMLButtonElement
  fireEvent.click(close)
}

const navigateToUpdate = () => {
  const update = screen.getByText('Editar')
  fireEvent.click(update)
}

const navigateToDashboard = () => {
  const dashboard = screen.getByText('Dashboard')
  fireEvent.click(dashboard)
}

describe('<Dashboard />', () => {
  it('Open Transaction modal', async () => {
    mockSetup()
    await act(() => {
      routeSetup()
    })
    const closedModal = screen.queryByTestId('transaction')
    expect(closedModal).not.toBeInTheDocument()
    openModal('Uma transação')
    const openedModal = screen.queryByTestId('transaction')
    expect(openedModal).toBeInTheDocument()
  })

  it('Navigate and save context and close modal', async () => {
    mockSetup()
    const router = await act(() => routeSetup())
    openModal('Outra transação')
    navigateToUpdate()
    expect(router.state.location.pathname).toBe('/submit/update') 
    navigateToDashboard()
    expect(router.state.location.pathname).toBe('/') 
    closeModal()
    await waitFor(() => {
      expect(screen.queryByTestId('transaction')).not.toBeInTheDocument()
    })
  })

  it('Exception message', async () => {
    mockErrorSetup()
    await act(() => {
      routeSetup()
    })
    const message = getErrorMessage('generic')
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })
}) 
