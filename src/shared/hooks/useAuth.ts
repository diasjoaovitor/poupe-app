import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthError } from 'firebase/auth'
import { TAuthService } from '../types'
import { getElementValues, getErrorMessage } from '../functions'

export const useAuth= (auth: TAuthService) => {
  const navigate = useNavigate()
  const [ loader, setLoader ] = useState(false)
  const [ message, setMessage ] = useState('')

  const handleClose = () => {
    setMessage('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setLoader(true)
      const [ email, password, passwordConfirm ] = getElementValues(e, [ 'email', 'password', 'passwordConfirm' ])
      if(passwordConfirm && (password !== passwordConfirm)) {
        setLoader(false)
        setMessage('As senhas são diferentes')
        return
      }
      await auth(email, password)
      navigate('/')
    } catch (error) {
      setLoader(false)
      const err = error as AuthError
      const message = getErrorMessage(err.code)
      setMessage(message)
    }
  }

  return {
    loader, message,
    handleClose, handleSubmit 
  }
}
