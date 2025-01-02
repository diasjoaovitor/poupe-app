import { createContext, ReactNode, useContext } from 'react'
import { TAppData } from '../../types'
import { useAppContextHook } from './useAppContextHook'

type TAppContext = {
  appContext: TAppData
  fetchEnabledContext: boolean
  setFetchEnabledContext(enabled: boolean): void
  saveContext(appContext: TAppData): void
  clearContext(): void
}

const AppContext = createContext({} as TAppContext)

export const useAppContext = () => useContext(AppContext)

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const provider = useAppContextHook()
  return <AppContext.Provider value={provider}>{children}</AppContext.Provider>
}
