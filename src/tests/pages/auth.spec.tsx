import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { Dashboard, Login, Register } from "../../pages"
import { ThemeProvider } from "../../shared/contexts"
import { TAuthService } from "../../shared/types"

jest.mock('firebase/auth')

const routeSetup = (auth: TAuthService) => {
  const router = createMemoryRouter(
    [
      { path: '/login', element: <Login login={auth} /> },
      { path: '/register', element: <Register register={auth} /> },
      { path: '/', element: <Dashboard /> }
    ],
    {
      initialEntries: ['/login']
    }
  )

  render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>)

  return { router }
}

const authMockSetup = (error: string) => {
  const login = jest.fn()
  login.mockImplementation(() => {
    throw { code: error }
  })
  return login
}

const loginSetup = (email: string, password: string) => {
  const emailInput = screen.getByLabelText('Email *')
  const passwordInput = screen.getByLabelText('Senha *')
  const button = screen.getByRole('button')

  userEvent.type(emailInput, email)
  userEvent.type(passwordInput, password)
  userEvent.click(button)
}

const registerSetup = (email: string, password: string, passwordConfirm: string) => {
  const toRegister = screen.getByRole('link')
  userEvent.click(toRegister)

  const emailInput = screen.getByLabelText('Email *')
  const passwordInput = screen.getByLabelText('Senha *')
  const passwordConfirmInput = screen.getByLabelText('Repita sua senha *')
  const button = screen.getByRole('button')

  userEvent.type(emailInput, email)
  userEvent.type(passwordInput, password)
  userEvent.type(passwordConfirmInput, passwordConfirm)
  userEvent.click(button)
}

describe('<Login />', () => {
  it('Navigation between Login and Register pages', async () => {
    const { router } = routeSetup(jest.fn())

    const toRegister = screen.getByRole('link')
    userEvent.click(toRegister)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/register') 
    })
    
    const toLogin = screen.getByRole('link')
    userEvent.click(toLogin)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/login') 
    })
  }) 

  it('User not found', async () => {
    const login = authMockSetup('auth/user-not-found')
    routeSetup(login)

    loginSetup('not-exists@not-exists.com', 'not-exists')
    await waitFor(() => {
      expect(screen.queryByText('Esse usuário não existe. Faça seu cadastro!')).toBeInTheDocument()
    })
  }) 

  it('Wrong password', async () => {
    const login = authMockSetup('auth/wrong-password')
    routeSetup(login)

    loginSetup('teste@teste.com', 'not-exists')
    await waitFor(() => {
      expect(screen.queryByText('Senha incorreta!')).toBeInTheDocument()
    })
  }) 

  it('Correct Login', async () => {
    const { router } = routeSetup(jest.fn())

    loginSetup('teste@teste.com', '123456')
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/') 
    })
  })
})

describe('<Register />', () => {
  it('Different passwords', async () => {
    const register = authMockSetup('')
    routeSetup(register)

    registerSetup('teste@teste.com', '123456', '1234567')
    await waitFor(() => {
      expect(screen.queryByText('As senhas são diferentes')).toBeInTheDocument()
    })
  })

  it('Email already in use', async () => {
    const register = authMockSetup('auth/email-already-in-use')
    routeSetup(register)

    registerSetup('teste@teste.com', '123456', '123456')
    await waitFor(() => {
      expect(screen.queryByText('Esse usuário já existe!')).toBeInTheDocument()
    })
  })
  
  it('Invalid email', async () => {
    const register = authMockSetup('auth/invalid-email')
    routeSetup(register)

    registerSetup('invalid@invalid', '123456', '123456')
    await waitFor(() => {
      expect(screen.queryByText('Email inválido!')).toBeInTheDocument()
    })
  })

  it('Correct Register', async () => {
    const { router } = routeSetup(jest.fn())

    registerSetup('teste@teste.com', '123456', '123456')
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/') 
    })
  })
})
