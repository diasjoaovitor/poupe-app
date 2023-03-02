import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { User } from 'firebase/auth'
import { authConfig } from '../environment'
import { Loader } from '../components'

type Props = {
  children: ReactNode
}

type TAuthContext = {
  user: User | null
}

const AuthContext = createContext({} as TAuthContext)

export const useAuthContext = () => useContext(AuthContext)

export const PrivateRoute: React.FC = () => {
  const { user } = useAuthContext()

  return !!user ? <Outlet /> : <Navigate to="/auth" />
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [ user, setUser ] = useState<User | null>(null)
  const [ loader, setLoader ] = useState(true)

  useEffect(() => {
    authConfig.onAuthStateChanged(user => {
      setUser(user)
      setLoader(false)
    })
  }, [])

  return !loader ?
    <AuthContext.Provider value={{ user }}>
     {children}
    </AuthContext.Provider> :
    <Loader open={loader} />
}
