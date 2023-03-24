import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { Submit } from '.'
import { AppProvider, ThemeProvider } from '../../shared/contexts'
import { useAppContextHook } from '../../shared/contexts/AppContext/useAppContextHook'
import { getSuccessMessage } from '../../shared/functions'
import { defaultAppState, transaction } from '../../shared/states'
import { TTransaction } from '../../shared/types'
import { createTransaction, createTransactions, updateTransaction } from './mutation-fn'

jest.mock('./mutation-fn')
jest.mock('../../shared/contexts/AppContext/useAppContextHook')

const mockedCreateTransaction = createTransaction as jest.Mock<any>
const mockedCreateTransactions = createTransactions as jest.Mock<any>
const mockedUpdateTransaction = updateTransaction as jest.Mock<any>

const mockedUseContext = useAppContextHook as jest.Mock<any>

const client = new QueryClient()

const routeSetup = (path: string) => {
  const router = createMemoryRouter(
    [
      { path: '/', element: <></> },
      { path: '/submit/:method', element: <Submit />}
    ],
    {
      initialEntries: [path]
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
  mockedCreateTransaction.mockImplementation(() => jest.fn())
  mockedCreateTransactions.mockImplementation(() => jest.fn())
  mockedUpdateTransaction.mockImplementation(() => jest.fn())
}

const mockContext = (transaction: TTransaction) => {
  mockedUseContext.mockImplementation(() => ({
    appContext: {
      ...defaultAppState,
      transaction
    },
    clearContext: jest.fn()
  }))
}

const submitForm = () => {
  const button = screen.getByText('Salvar')
  fireEvent.click(button)
}

describe('<Submit />', () => {
  beforeEach(mockSetup)

  it('Create sigle transaction successfully', async () => {
    mockContext(transaction)
    routeSetup('/submit/create')
    submitForm()
    const message = getSuccessMessage('createTransaction')
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })

  it('Create recurring transaction successfully', async () => {
    mockContext({
      ...transaction,
      recurrence: {
        frequency: 'MONTHLY',
        take: 2
      }
    })
    routeSetup('/submit/create')
    submitForm()
    const message = getSuccessMessage('createTransactions')
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })

  it('Update sigle transaction successfully', async () => {
    mockContext(transaction)
    routeSetup('/submit/update')
    submitForm()
    const message = getSuccessMessage('updateTransaction')
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })

  it('Update sigle transaction and add recurrence successfully', async () => {
    mockContext({
      ...transaction,
      recurrence: {
        frequency: 'WEEKLY',
        take: 2
      }
    })
    routeSetup('/submit/update')
    submitForm()
    const message = getSuccessMessage('updateTransactionAndAddRecurrence')
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })

  it('Update recurring transactions successfully', async () => {
    mockContext({ 
      ...transaction,
      recurrenceRef: 'abc',
      recurrence: {
        frequency: 'WEEKLY',
        take: 2
      }
    })
    routeSetup('/submit/update')
    submitForm()
    const message = getSuccessMessage('updateTransactions')
    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })
}) 
