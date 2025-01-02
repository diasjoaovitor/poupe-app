import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthError } from 'firebase/auth'
import { getElementValues, getErrorMessage } from '../../shared/functions'
import { loginState, registerState } from './auth-state'

export const useAuth = () => {
  const navigate = useNavigate()

  const [state, setState] = useState(loginState)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleState = () =>
    setState(({ title }) =>
      title === loginState.title ? registerState : loginState
    )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const [email, password, passwordConfirm] = getElementValues(e, [
        'email',
        'password',
        'passwordConfirm'
      ])
      if (passwordConfirm && password !== passwordConfirm) {
        setIsLoading(false)
        setMessage('As senhas são diferentes')
        return
      }
      await state.auth(email, password)
      navigate('/')
    } catch (error) {
      setIsLoading(false)
      const err = error as AuthError
      const message = getErrorMessage(err.code)
      setMessage(message)
    }
  }

  return {
    state,
    handleState,
    isLoading,
    notificationMessage: message,
    handleSubmit
  }
}
