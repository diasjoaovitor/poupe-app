import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from "react-query"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { Login, Register } from "../../pages"
import { ThemeProvider } from "../../shared/contexts"
import { login, register } from "../../shared/firebase"
import { TAuthService } from "../../shared/types"

jest.mock('../../shared/firebase')
const client = new QueryClient()

const routeSetup = () => {
  const router = createMemoryRouter(
    [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/', element: <div>dashboard</div> }
    ],
    {
      initialEntries: ['/login']
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

const authMockSetup = (auth: TAuthService, error: string) => {
  const mock = auth as jest.Mock<any>
  mock.mockImplementation(() => {
    throw { code: error }
  })
  return mock
}

const loginSetup = (email: string, password: string) => {
  const emailInput = screen.getByLabelText('Email *')
  const passwordInput = screen.getByLabelText('Senha *')
  const button = screen.getByRole('button')

  fireEvent.change(emailInput, email)
  fireEvent.change(passwordInput, password)
  fireEvent.click(button)
}

const registerSetup = (email: string, password: string, passwordConfirm: string) => {
  const toRegister = screen.getByRole('link')
  fireEvent.click(toRegister)

  const emailInput = screen.getByLabelText('Email *')
  const passwordInput = screen.getByLabelText('Senha *')
  const passwordConfirmInput = screen.getByLabelText('Repita sua senha *')
  const button = screen.getByRole('button')

  fireEvent.change(emailInput, email)
  fireEvent.change(passwordInput, password)
  fireEvent.change(passwordConfirmInput, passwordConfirm)
  fireEvent.click(button)
}

describe('<Login />', () => {
  it('Navigation between Login and Register pages', async () => {
    const { router } = routeSetup()

    const toRegister = screen.getByRole('link')
    fireEvent.click(toRegister)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/register') 
    })
    
    const toLogin = screen.getByRole('link')
    fireEvent.click(toLogin)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/login') 
    })
  }) 

  it('User not found', async () => {
    authMockSetup(login, 'auth/user-not-found')
    routeSetup()

    loginSetup('not-exists@not-exists.com', 'not-exists')
    await waitFor(() => {
      expect(screen.queryByText('Esse usuário não existe. Faça seu cadastro!')).toBeInTheDocument()
    })
  }) 

  it('Wrong password', async () => {
    authMockSetup(login, 'auth/wrong-password')
    routeSetup()

    loginSetup('teste@teste.com', 'not-exists')
    await waitFor(() => {
      expect(screen.queryByText('Senha incorreta!')).toBeInTheDocument()
    })
  }) 

  it('Correct Login', async () => {
    const { router } = routeSetup()
    loginSetup('teste@teste.com', '123456')
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/') 
    })
  })
})

describe('<Register />', () => {
  it('Different passwords', async () => {
    routeSetup()

    const toRegister = screen.getByRole('link')
    fireEvent.click(toRegister)

    const emailInput = screen.getByLabelText('Email *')
    const passwordInput = screen.getByLabelText('Senha *')
    const passwordConfirmInput = screen.getByLabelText('Repita sua senha *')
    const button = screen.getByRole('button')

    await act(() => {
      userEvent.type(emailInput, 'teste@teste.com')
      userEvent.type(passwordInput, '123456')
      userEvent.type(passwordConfirmInput, '1234567')
      userEvent.click(button)
    })

    await waitFor(() => {
      expect(screen.queryByText('As senhas são diferentes')).toBeInTheDocument()
    })
  })

  it('Email already in use', async () => {
    authMockSetup(register, 'auth/email-already-in-use')
    routeSetup()

    registerSetup('teste@teste.com', '123456', '123456')
    await waitFor(() => {
      expect(screen.queryByText('Esse usuário já existe!')).toBeInTheDocument()
    })
  })
  
  it('Invalid email', async () => {
    authMockSetup(register, 'auth/invalid-email')
    routeSetup()

    registerSetup('invalid@invalid', '123456', '123456')
    await waitFor(() => {
      expect(screen.queryByText('Email inválido!')).toBeInTheDocument()
    })
  })

  it('Correct Register', async () => {
    const { router } = routeSetup()
    registerSetup('teste@teste.com', '123456', '123456')
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/') 
    })
  })
})
